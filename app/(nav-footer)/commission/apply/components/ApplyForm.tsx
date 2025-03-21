"use client";
import { ChangeEvent, useState } from "react";

import { v4 } from "uuid";

import { insertNewApply, insertNewApplyFileList } from "../api/cmsApplyApi";

import { UserSessonObj } from "@/types/userType";

import { UseForm, Validators } from "@/utils/validation/validationUtil";
import { byteToMb } from "@/utils/number.util";

import FileUploadButton from "@/components/FileUploadButton";

import RequestLoading from "@/components/RequestLoading";
import LetterCounter from "@/components/LetterCounter";

import { TextField, Typography, Box, FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { ServerResponseCode } from "@/types/api.type";

const ApplyForm = ({ userInfo }: { userInfo: UserSessonObj | null }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const uuid = v4();
    const [form, setForm] = useState({
        userName: userInfo ? userInfo.nickname : "",
        userEmail: userInfo ? userInfo.email : "",
        nicknameYn: "N",
        nickname: "",
        sendEmailYn: "N",
        sendEmail: "",
        content: "",
        files: [] as File[],
    });

    const validationForm = {
        userName: {
            value: form.userName,
            validConditions: [Validators.notBlank(), Validators.minLength(2), Validators.maxLength(30)],
            message: "신청자명을 2자 이상 30자 이하로 입력해 주세요",
            failure: false,
        },
        userEmail: {
            value: form.userEmail,
            validConditions: [Validators.notBlank(), Validators.maxLength(254)],
            message: "이메일을 입력해 주세요",
            failure: false,
        },
        userEmailRegex: {
            value: form.userEmail,
            validConditions: [Validators.isEmail()],
            message: "이메일 형식을 확인해 주세요 @와 도메인이 포함되어야 합니다.",
            failure: false,
        },
        nickname: {
            value: form.nicknameYn === "N"
                || (form.nicknameYn === "Y"
                    && !(form.nickname === "" || form.nickname.length < 1)
                    && form.nickname.length <= 100),
            validConditions: [Validators.assertTrue()],
            message: "기재할 닉네임을 100자 이하로 입력해 주세요",
            failure: false,
        },
        sendEmail: {
            value: form.sendEmailYn === "N"
                || (form.sendEmailYn === "Y"
                    && !(form.sendEmail === "" || form.sendEmail.length < 1))
                && form.sendEmail.length <= 254,
            validConditions: [Validators.assertTrue()],
            message: "전송할 이메일 주소를 254자 이하로 입력해 주세요",
            failure: false,
        },
        content: {
            value: form.content,
            validConditions: [Validators.notBlank(), Validators.minLength(5), Validators.maxLength(500)],
            message: "신청 내용을 최소 5자 이상 최대 500자 이하로 입력해 주세요",
            failure: false,
        },
        fileList: {
            value: form.files.reduce((acc, file) => acc + file.size, 0) <= byteToMb(50),
            validConditions: [Validators.assertTrue()],
            message: "파일 용량이 50MB를 초과할 수 없습니다.",
            failure: false,
        }
    };

    const onSubmit = async () => {
        const { isValid, message } = UseForm(validationForm);

        if (!isValid) {
            alert(message);
            return;
        }

        const formData = new FormData();
        formData.append("id", uuid);
        formData.append("status", "REQUEST");
        formData.append("memberYn", userInfo ? "Y" : "N");
        formData.append("userName", form.userName);
        formData.append("userEmail", form.userEmail);
        formData.append("nicknameYn", form.nicknameYn);
        formData.append("nickname", form.nickname);
        formData.append("sendEmailYn", form.sendEmailYn);
        formData.append("sendEmail", form.sendEmail);
        formData.append("content", form.content);

        setLoading(true);
        const respJson = await insertNewApply(formData);

        if (Number(respJson.status) === ServerResponseCode.Success) {

            if (form.files.length > 0) {
                const fileListForm = new FormData();
                fileListForm.append("applyId", uuid);
                form.files.forEach((file) => {
                    fileListForm.append("files", file);
                });
                insertNewApplyFileList(fileListForm);
            }

            setLoading(false);
            alert("신청이 완료되었습니다.");

            setForm({
                userName: userInfo ? userInfo.nickname : "",
                userEmail: userInfo ? userInfo.email : "",
                nicknameYn: "N",
                nickname: "",
                sendEmailYn: "N",
                sendEmail: "",
                content: "",
                files: [] as File[],
            });
        } else {
            alert(respJson.message ? respJson.message : "요청 도중 오류가 발생했습니다. 재시도해주세요");
        }
        setLoading(false);
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
        {loading && <RequestLoading />}
        <Box className="bg-white p-8">
            <Typography variant="h5" className="flex justify-center items-center text-center mb-6 font-semibold">
                커미션 신청 폼
            </Typography>
            <div className="mb-4">
                <TextField
                    required
                    label="신청자명 (2자 이상 30자 이하)"
                    type="text"
                    value={form.userName}
                    onChange={(e) => setForm({ ...form, userName: e.target.value })}
                    fullWidth
                    variant="outlined"
                />
            </div>
            <div className="mb-4">
                <TextField
                    required
                    label="이메일 주소 (@형식을 갖춘 254자 이하)"
                    type="email"
                    value={form.userEmail}
                    onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
                    disabled={(userInfo && userInfo.email) ? true : false}
                    fullWidth
                    variant="outlined"
                />
            </div>
            <FormLabel>
                <div className="flex items-center gap-2">
                    닉네임 기재 여부 (100자 이하)
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
            <FormLabel>이메일 전송 (@형식을 갖춘 254자 이하)</FormLabel>
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
                <div className="my-5 flex justify-between items-center gap-2">
                    신청 내용 (최소 5자 이상 ~ 최대 500자 이내)
                    <LetterCounter limit={500} letters={form.content} />
                </div>
            </FormLabel>
            <div className="mb-6">
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    value={form.content}
                    multiline
                    rows={5}
                    placeholder={"신청 내용은 구체적일 수록 좋아요.\n공지표, 배경 추가의 경우 공지표에 들어갈 문구나 배경 금액도 함께 적어주세요"}
                    onChange={(e) => {
                        setForm({ ...form, content: e.target.value })
                    }}
                />
            </div>
            <div className="mb-4">
                <div className="py-2 font-bold text-gray-500 [&>p]:pt-3">
                    <div className="font-bold text-lg">
                        파일 업로드 시 주의사항
                    </div>
                    <p>* 업로드 최대 용량은 <span className="text-rose-500 font-bold">50MB</span>입니다. 이미지가 10장이 넘어가는 단체의 경우 <span className="text-rose-500 font-bold">pdf나 excel</span>을 추천드립니다.</p>
                    <p>* 이미지가 많은 경우 <span className="text-rose-500 font-bold">에버노트, 노션, 포스타입 등을 이용한 웹 링크</span>를 신청서 내용에 첨부해도 좋습니다!</p>
                    <p>* 시간이 소요될 수 있습니다. 업로드 전 <span className="text-rose-500 font-bold">인터넷 연결</span>을 꼭 확인해주세요</p>
                </div>
                <FileUploadButton
                    onChange={handleFileChange}
                    onFileList={() => { }}
                />
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

export default ApplyForm;