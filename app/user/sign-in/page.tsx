import { TextField, Button, Container, Typography, Box } from '@mui/material';

const SignInPage = () => {
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
                    <div className="flex justify-between mb-4">
                        <div>비밀번호 찾기</div>
                        <div>
                            <input type="checkbox" name="staySignIn" id="staySignIn" />
                            <label htmlFor="staySignIn">7일동안 로그인 유지</label>
                        </div>
                    </div>
                    <div>
                        <Button variant="contained" color="success" className="mb-4">
                            네이버 로그인
                        </Button>
                        <Button variant="contained" color="warning" className="mb-4">
                            카카오 로그인
                        </Button>
                        <Button variant="contained" color="info" className="mb-4">
                            구글 로그인
                        </Button>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4"
                    >
                        로그인
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignInPage;
