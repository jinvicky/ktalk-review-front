"use client";
import { ChangeEvent, useState } from "react";
import { TextField, Button, Typography, Box, FormControlLabel, Radio, RadioGroup, FormLabel, } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const CommissionApplyForm = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        nicknameYn: "N",
        nickname: "",
        sendEmailYn: "N",
        sendEmail: "",
        content: "",
        files: [] as File[],
    });

    const onSubmit = async () => {
        console.log(form);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const selectedFiles = (e.target as HTMLInputElement).files;
        if (!selectedFiles) return;
        setForm({ ...form, files: [...form.files, ...Array.from(selectedFiles)]});
    };

    const removeFile = (index: number) => {
        const newFiles = form.files.filter((_, i) => i !== index);
        setForm({ ...form, files: newFiles });
    }

    return <>
        <Box className="bg-white p-8 ">
            <Typography variant="h5" className="text-center mb-6 font-semibold">
                커미션 신청 폼
            </Typography>
            <div className="mb-4">
                <TextField
                    label="신청자명"
                    variant="outlined"
                    fullWidth
                    type="nickname"
                    className="mb-4"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
            </div>
            <FormLabel id="demo-row-radio-buttons-group-label">닉네임 기재</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="nickname-group"
                defaultValue="N"
                onChange={(e) => setForm({ ...form, nicknameYn: e.target.value, nickname: e.target.value === "Y" ? form.nickname : "" })}
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
            <FormLabel id="demo-row-radio-buttons-group-label">이메일 전송</FormLabel>
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
                                    <ClearIcon onClick={() => removeFile(index)}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div
                className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center font-bold my-5 py-2 px-4 rounded"
                onClick={onSubmit}
            >
                신청하기
            </div>
        </Box>
    </>;
}

export default CommissionApplyForm;