"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserSignUp } from '@/types/userType';
import { UseForm, Validators } from '@/utils/validation/validationUtil';

import { TextField, Button, Container, Typography, Box, Checkbox, FormControlLabel, Radio } from '@mui/material';

const SignUpPage = () => {
    const router = useRouter();
    const [form, setForm] = useState<UserSignUp>({
        email: '',
        pwd: '',
        nickname: '',
        phoneNumber: '',
        notifyYn: 'N',
        notifyMethod: '',
    });

    const validationForm = {
        nickname: {
            value: form.nickname,
            validConditions: [Validators.notBlank(), Validators.maxLength(30)],
            message: "닉네임은 30자 이내로 입력해 주세요",
            failure: false,
        },
        email: {
            value: form.email,
            validConditions: [Validators.notBlank(), Validators.isEmail()],
            message: "올바른 이메일 형식으로 입력해 주세요",
            failure: false,
        },
        pwd: {
            value: form.pwd,
            validConditions: [Validators.notBlank(), Validators.minLength(7)],
            message: "비밀번호는 8자 이상 필수 입력입니다",
            failure: false,
        },
        phoneNumber: {
            value: form.phoneNumber,
            validConditions: [Validators.notBlank()],
            message: "전화번호는 필수 입력입니다",
            failure: false,
        },
        notifyMethod: {
            value: form.notifyYn !== "Y" || form.notifyMethod !== "",
            validConditions: [Validators.assertTrue()],
            message: "알림 수신에 동의하셨다면 알림 수단을 선택해 주세요",
            failure: false,
        },
    }

    const onSubmit = async () => {
        const { isValid, message } = UseForm(validationForm);

        if (!isValid) {
            alert(message);
            return;
        }

        const resp = await fetch('/next-api/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await resp.json() as NextApiResult;
        console.log('resp:', data);

        if (data.status === "200") {
            alert("회원가입이 완료되었습니다.");

            const referer = localStorage.getItem('referer') || "/promotion";
            router.push(referer);
        }
    };
    return (
        <Container
            maxWidth="xs"
            className="my-12"
        >
            <Box className="bg-white p-8">
                <Typography variant="h5" className="text-center mb-6 font-semibold">
                    회원가입
                </Typography>
                <div className="mb-4">
                    <TextField
                        label={"닉네임"}
                        variant="outlined"
                        fullWidth
                        className="mb-4"
                        value={form.nickname}
                        onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="이메일"
                        variant="outlined"
                        fullWidth
                        type="email"
                        className="mb-4"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="비밀번호"
                        variant="outlined"
                        fullWidth
                        type="password"
                        className="mb-4"
                        value={form.pwd}
                        onChange={(e) => setForm({ ...form, pwd: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="전화번호"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        className="mb-4"
                        value={form.phoneNumber}
                        onChange={(e) => {
                            setForm({ ...form, phoneNumber: e.target.value.replace(/[^0-9]/g, "") })
                        }}
                    />
                </div>
                {/* 알림 수신 여부 */}
                <div className="mb-6">
                    <FormControlLabel
                        control={<Checkbox name="notifyYn" />}
                        label="알림 수신 동의"
                        value={form.notifyYn}
                        onChange={(_, checked: boolean) => {
                            setForm({
                                ...form,
                                notifyYn: checked ? "Y" : "N",
                                notifyMethod: checked ? form.notifyMethod : ""
                            });
                        }}
                    />
                    <div>
                        <FormControlLabel
                            control={
                                <Radio
                                    name="receiveNotifications"
                                    checked={form.notifyYn === "Y" && (form.notifyMethod === "" || form.notifyMethod === "EMAIL")}
                                    onChange={(_, checked: boolean) => {
                                        setForm({ ...form, notifyMethod: checked ? "EMAIL" : form.notifyMethod });
                                    }}
                                />
                            }
                            label="이메일"
                            disabled={form.notifyYn === "N"}
                        />
                        <FormControlLabel
                            control={
                                <Radio
                                    name="receiveNotifications"
                                    checked={form.notifyMethod === "SMS"}
                                    onChange={(_, checked: boolean) => {
                                        setForm({ ...form, notifyMethod: checked ? "SMS" : form.notifyMethod });
                                    }}
                                />
                            }
                            label="SMS"
                            disabled={form.notifyYn === "N"}
                        />
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mt-4"
                    onClick={onSubmit}
                >
                    회원가입
                </Button>
                <div
                    className="mt-4 w-full text-center border border-blue-500 p-2 rounded cursor-pointer text-blue-500"
                    onClick={() => router.push("/user/sign-in")}
                >
                    로그인
                </div>
            </Box>
        </Container >
    );
};

export default SignUpPage;
