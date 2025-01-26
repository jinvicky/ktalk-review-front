"use client";

import { useState } from "react";

import { UserSignIn } from "@/types/userType";
import { UseForm, Validators } from "@/utils/validation/validationUtil";

import { TextField, Button, Container, Typography, Box } from "@mui/material";

const SignInForm = () => {
  const [form, setForm] = useState<UserSignIn>({
    email: "",
    pwd: "",
  });

  const validationForm = {
    email: {
      value: form.email,
      validConditions: [Validators.notBlank(), Validators.isEmail()],
      message: "이메일은 필수 입력입니다. 올바른 이메일 형식으로 입력해 주세요",
      failure: false,
    },
    pwd: {
      value: form.pwd,
      validConditions: [Validators.notBlank(), Validators.minLength(7)],
      message: "비밀번호는 8자 이상 필수 입력입니다",
      failure: false,
    },
  };

  const onSubmit = async () => {
    const { isValid, message } = UseForm(validationForm);

    if (!isValid) {
      alert(message);
      return;
    }

    const resp = await fetch("/next-api/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = (await resp.json()) as { status: string; message: string };

    if (data.status !== "200") {
      alert(
        "요청 도중 문제가 발생했습니다. 재시도 혹은 관리자에게 문의해 주세요"
      );
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <TextField
              label="비밀번호"
              variant="outlined"
              fullWidth
              type="password"
              value={form.pwd}
              onChange={(e) => setForm({ ...form, pwd: e.target.value })}
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
