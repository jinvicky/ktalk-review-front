"use client";
import { ChangeEvent, useState } from "react";

import { v4 } from "uuid";

import { TextField, Typography, Box, FormControlLabel, Radio, RadioGroup, FormLabel, Tooltip, } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import HelpIcon from '@mui/icons-material/Help';

import { UserSessonObj } from "@/types/userType";
import { insertCommissionApply } from "@/api/commissionApplyApi";

interface CommissionApplyFormProps {
    userInfo: UserSessonObj;
}

const CommissionApplyForm = ({ userInfo }: CommissionApplyFormProps) => {
    const uuid = v4();
    const [form, setForm] = useState({
        userName: userInfo.nickname,
        userEmail: userInfo.email,
        nicknameYn: "N",
        nickname: "",
        sendEmailYn: "N",
        sendEmail: "",
        content: "",
        files: [] as File[],
        status: "신청완료", 
        memberYn: userInfo ? "Y" : "N",
    });

    const onSubmit = async () => {
        const formData = new FormData();

        formData.append("id", uuid);
        formData.append("userName", form.userName);
        formData.append("userEmail", form.userEmail);
        formData.append("nicknameYn", form.nicknameYn);
        formData.append("nickname", form.nickname);
        formData.append("sendEmailYn", form.sendEmailYn);
        formData.append("sendEmail", form.sendEmail);
        formData.append("content", form.content);
        formData.append("status", form.status);
        formData.append("memberYn", form.memberYn);

        form.files.forEach((file) => {
            formData.append("files", file);
        });

        const data = await insertCommissionApply(formData);

        if(data.status === "200") {
            alert("신청이 완료되었습니다.");
        } else {
            alert(data.data.message ? data.data.message : "요청 도중 오류가 발생했습니다. 재시도해주세요");
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const selectedFiles = (e.target as HTMLInputElement).files;
        if (!selectedFiles) return;
        setForm({ ...form, files: [...form.files, ...Array.from(selectedFiles)] });
    };

    const removeFile = (index: number) => {
        const newFiles = form.files.filter((_, i) => i !== index);
        setForm({ ...form, files: newFiles });
    }

    return <>
        <Box className="bg-white p-8">
            <Typography variant="h5" className="flex justify-center items-center text-center mb-6 font-semibold">
                커미션 신청 폼
            </Typography>
            <div className="mb-4">
                <TextField
                    label="신청자명"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value={form.userName}
                    onChange={(e) => setForm({ ...form, userName: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <TextField
                    label="이메일 주소"
                    variant="outlined"
                    fullWidth
                    type="email"
                    className="mb-4"
                    value={form.userEmail}
                    disabled={userInfo.email ? true : false}
                    onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
                />
            </div>
            <FormLabel>
                <div className="flex items-center gap-2">
                    닉네임 기재
                    <Tooltip title={<h1 style={{ color: "white", fontSize: "20px" }}>
                        메이플 캐릭터나 자캐 닉네임을 의미합니다.
                    </h1>}>
                        <HelpIcon />
                    </Tooltip>
                </div>
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="nickname-group"
                defaultValue="N"
                onChange={(e) => setForm({
                    ...form,
                    nicknameYn: e.target.value,
                    nickname: e.target.value === "Y" ? form.nickname : ""
                })}
            >
                <FormControlLabel value="Y" control={<Radio />} label="예" />
                <FormControlLabel value="N" control={<Radio />} label="아니요" />
            </RadioGroup>
            {
                form.nicknameYn === "Y" &&
                <TextField
                    label="닉네임"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value={form.nickname}
                    onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                />
            }
            <FormLabel>이메일 전송</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="send-email-group"
                defaultValue="N"
                onChange={(e) => setForm({ ...form, sendEmailYn: e.target.value, sendEmail: e.target.value === "Y" ? form.sendEmail : "" })}
            >
                <FormControlLabel value="Y" control={<Radio />} label="예" />
                <FormControlLabel value="N" control={<Radio />} label="아니요" />
            </RadioGroup>
            {
                form.sendEmailYn === "Y" &&
                <TextField
                    label="전송 이메일 주소"
                    variant="outlined"
                    fullWidth
                    type="email"
                    className="mb-4"
                    value={form.sendEmail}
                    onChange={(e) => setForm({ ...form, sendEmail: e.target.value })}
                />
            }

            <FormLabel id="">
                <div className="mb-5 flex items-center gap-2">
                    타입별로 추가 정보가 필요할 수 있습니다.
                    <Tooltip title={<h1 style={{ color: "white", fontSize: "20px" }}>
                        <ul>
                            <li>
                                동숲 공지표는 텍스트 본문이 필요합니다.
                            </li>
                            <li>
                                배경 신청시 예상 금액이 필요합니다.
                            </li>
                        </ul>
                    </h1>}>
                        <HelpIcon />
                    </Tooltip>
                </div>
            </FormLabel>
            <div className="mb-6">
                <TextField
                    label="신청 내용"
                    variant="outlined"
                    fullWidth
                    type="text"
                    value={form.content}
                    multiline
                    rows={5}
                    placeholder="신청 내용을 입력해주세요."
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    id="file-upload"
                    hidden
                />

                <label htmlFor="file-upload">
                    <div className="w-full bg-violet-500 hover:bg-violet-700 text-white text-center font-bold my-5 py-2 px-4 rounded">
                        파일 선택
                    </div>
                </label>
                {form.files.length > 0 && (
                    <div className="mt-4">
                        <ul>
                            {form.files.map((file, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between border border-blue-300 p-2 rounded"
                                >
                                    <div>
                                        {file.name}

                                    </div>
                                    <ClearIcon onClick={() => removeFile(index)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div
                className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center gap-4 font-bold my-5 py-2 px-4 rounded"
                onClick={onSubmit}
            >
                신청하기
            </div>
        </Box>
    </>;
}

export default CommissionApplyForm;