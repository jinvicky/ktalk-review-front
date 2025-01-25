"use client";

import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import { signIn } from '@/api/userApi';


const SignInForm = () => {

    // const [form, setForm] = useState({
    //     email: 'jinvicky@naver.com',
    //     pwd: '1234',
    // });

    const onSubmit = async () => {
        const form = {
            email: 'wkdu0723@naver.com',
            pwd: '12345678',
        }

        const resp = await fetch('/next-api/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await resp.json() as { status: string, message: string };

        if(data.status !== "200") {
            alert("요청 도중 문제가 발생했습니다. 재시도 혹은 관리자에게 문의해 주세요");
        } else {
            alert("로그인에 성공했습니다.");
            window.location.href = "/";
        }
    };
    
    return (
        <Container maxWidth="xs" className="my-12">
            <Box className="bg-white p-8 ">
                <Typography variant="h5" className="text-center mb-6 font-semibold">
                    로그인
                </Typography>
                <form>
                    <div className="mb-4">
                        <TextField
                            label="이메일"
                            variant="outlined"
                            fullWidth
                            type="email"
                            className="mb-4"
                        />
                    </div>
                    <div className="mb-6">
                        <TextField
                            label="비밀번호"
                            variant="outlined"
                            fullWidth
                            type="password"
                        />
                    </div>
                    {/* <div className="flex justify-between mb-4">
                        <div>비밀번호 찾기</div>
                        <div>
                            <input type="checkbox" name="staySignIn" id="staySignIn" />
                            <label htmlFor="staySignIn">7일동안 로그인 유지</label>
                        </div>
                    </div> */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4"
                        onClick={onSubmit}
                    >
                        로그인
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignInForm;
