"use client";

import { UserSignUp } from '@/types/userType';
import { TextField, Button, Container, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

const SignUpPage = () => {

    const onSubmit = async () => {
        const signUpForm: UserSignUp =  {
            email: 'wkdu0723@naver.com', 
            pwd: '12345678',
            nickname: 'wkdu0723',
            phoneNumber: '01022397838',
            notifyYn: 'Y',
            notifyMethod: 'email',
        }

        const resp = await fetch('/next-api/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpForm),
        });

        console.log('resp:', await resp.json());
    };
    return (
        <Container maxWidth="xs" className="my-12">
            <Box className="bg-white p-8">
                <Typography variant="h5" className="text-center mb-6 font-semibold">
                    회원가입
                </Typography>
                <form>
                    {/* 닉네임 */}
                    <div className="mb-4">
                        <TextField
                            label={
                                <span>
                                    닉네임
                                </span>
                            }
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                        />
                    </div>
                    {/* 이메일 */}
                    <div className="mb-4">
                        <TextField
                            label="이메일"
                            variant="outlined"
                            fullWidth
                            type="email"
                            className="mb-4"
                        />
                    </div>
                    {/* 비밀번호 */}
                    <div className="mb-4">
                        <TextField
                            label="비밀번호"
                            variant="outlined"
                            fullWidth
                            type="password"
                            className="mb-4"
                        />
                    </div>
                    {/* 전화번호 */}
                    <div className="mb-4">
                        <TextField
                            label="전화번호"
                            variant="outlined"
                            fullWidth
                            type="tel"
                            className="mb-4"
                        />
                    </div>
                    {/* 알림 수신 여부 */}
                    <div className="mb-6">
                        <FormControlLabel
                            control={<Checkbox name="receiveNotifications" />}
                            label="알림 수신 동의"
                        />
                        <div>
                            <FormControlLabel
                                control={<Checkbox name="receiveNotifications" />}
                                label="이메일"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox name="receiveNotifications" />}
                                label="카카오톡"
                            /> */}
                            <FormControlLabel
                                control={<Checkbox name="receiveNotifications" />}
                                label="SMS"
                            />
                        </div>
                    </div>
                    {/* 회원가입 버튼 */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4"
                        onClick={onSubmit}
                    >
                        회원가입
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignUpPage;
