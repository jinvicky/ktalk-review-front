"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UseForm, Validators } from "@/utils/validation/validationUtil";

import { TextField, Button, Container, Typography, Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const NonUserPurchaseSearchForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    purchaseId: "",
    purchaseType: "COMMISSION",
  });

  const validationForm = {
    email: {
      value: form.email,
      validConditions: [Validators.notBlank(), Validators.isEmail()],
      message: "이메일은 필수 입력입니다. 올바른 이메일 형식으로 입력해 주세요",
      failure: false,
    },
    purchaseId: {
      value: form.purchaseId,
      validConditions: [Validators.notBlank()],
      message: "올바른 구매(주문) 아이디를 입력해 주세요",
      failure: false,
    },
  };

  const onSubmit = async () => {
    const { isValid, message } = UseForm(validationForm);

    if (!isValid) {
      alert(message);
      return;
    }

    // const resp = await fetch("/next-api/sign-in", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // });

    // const data = (await resp.json()) as { status: string; message: string };

    // if (data.status !== "200") {
    //   alert(
    //     "요청 도중 문제가 발생했습니다. 재시도 혹은 관리자에게 문의해 주세요"
    //   );
    // } else {
    //   alert("로그인에 성공했습니다.");
    //   window.location.href = "/";
    // }
  };

  return (
    <Container maxWidth="xs" className="my-12">
      <Box className="bg-white p-8 ">
        <Typography variant="h5" className="text-center mb-6 font-semibold">
          비회원 주문 조회
        </Typography>
        <div>
          <p>
            * 오직 비회원 신청/주문 조회만 가능합니다.
          </p>
        </div>
        <div className="my-5">
          <RadioGroup
            row
            name="nickname-group"
            defaultValue="COMMISSION"
            onChange={(e) => setForm({
              ...form,
              purchaseType: e.target.value,
            })}
          >
            <FormControlLabel value="COMMISSION" control={<Radio />} label="커미션" />
            <FormControlLabel value="GOODS" control={<Radio />} label="굿즈(상품)" />
          </RadioGroup>
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
        <div className="mb-6">
          <TextField
            label="커미션 신청 또는 주문 아이디"
            variant="outlined"
            fullWidth
            type="password"
            value={form.purchaseId}
            onChange={(e) => setForm({ ...form, purchaseId: e.target.value })}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={onSubmit}
        >
          조회하기
        </Button>
        <div className="flex justify-between mt-2">
          <div
            className="mt-4 w-full text-center border border-blue-500 p-2 rounded cursor-pointer text-blue-500"
            onClick={() => router.push("/user/sign-in")}
          >
            로그인
          </div>
          <div
            className="mt-4 w-full text-center border border-blue-500 p-2 rounded cursor-pointer text-blue-500"
            onClick={() => router.push("/")}
          >
            홈으로 이동
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default NonUserPurchaseSearchForm;
