"use client";
import { useEffect, useMemo, useState } from "react";

import { addCommaKRW, addPayappFee } from "@/utils/number.util";
import { generateUniqueIdByPrfix } from "@/utils/uniqueId.util";

import { Button, TextField } from "@mui/material";

interface PaymentFormProps {
  totalPrice: number;
  prodId: string;
  prodQuantity: number;
}

declare const PayApp: PayApp;

const EventPaymentForm = ({ totalPrice, prodId, prodQuantity }: PaymentFormProps) => {
  const ordId = generateUniqueIdByPrfix("ORD");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const totalPriceWithFee = useMemo(
    () => addPayappFee(totalPrice),
    [totalPrice]
  );

  useEffect(() => {
    // payapp-lite.js 스크립트 추가
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://lite.payapp.kr/public/api/v2/payapp-lite.js";
    document.body.appendChild(scriptTag);
  }, []);

  /** 입력한 상품정보 체크 */
  const vaildateInfo = () => {
    setUserNameError(!userName);
    setEmailError(!email);

    if (!(userName || email)) return false;
    return true;
  }

  const onSubmitPayment = () => {
    if (!vaildateInfo()) return;
    PayApp.setDefault("userid", "payapptest"); // 테스트 후에 jinvicky로 수정 예정
    PayApp.setDefault("shopname", "jinvickyCommission");
    PayApp.setParam("goodname", "이벤트 주문"); // 1개일때는 선택한 상품명, 2개 이상일 때는 맨 처음 상품명 왜 n개로 표시
    PayApp.setParam("price", totalPriceWithFee.toString());
    PayApp.setParam("recvphone", phone);
    PayApp.setParam("smsuse", "n");
    PayApp.setParam("redirectpay", "1");
    PayApp.setParam("skip_cstpage", "y");
    PayApp.setParam("var1", ordId); // 중복방지를 위해서 주문번호를 var1로 전달
    PayApp.setParam(
      "feedbackurl",
      "https://ktalk-review-image-latest.onrender.com/api/event-sale/payapp-feedback"
    );
    PayApp.setParam("skip_cstpage", "n"); // n이어야 returnurl 에러 안남
    PayApp.setParam("returnurl", "https://ktalk-review-image-latest.onrender.com/api/event-sale/payapp-redirect");
    PayApp.call();
  };

  const onSubmitOrder = () => {
    if (buttonDisabled) return;
    setButtonDisabled(true);
    const json = {
      id: ordId,
      eventProdId: prodId,
      userName: userName,
      userEmail: email,
      price: totalPriceWithFee,
      phone: phone,
      quantity: 1, // 주문한 상품의 개수 (이벤트 상품은 1개만 주문 가능)
      prodQuantity: prodQuantity,  // 상품의 총 재고 개수
    };

    fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/event-sale/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    }).then(async (resp) => {
      const data = (await resp.json()) as ApiResult<number>;

      if (data.status === "OK" && data.data > 0) {
        onSubmitPayment();
        setButtonDisabled(false);
      }
    });
  };

  const formattedTotalPrice = useMemo(
    () => addCommaKRW(totalPriceWithFee, true),
    [totalPriceWithFee]
  );

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPhone(newValue.replace(/[^0-9]/g, ""));
  };

  return (
    <>
      <div className="border-t-2 border-black p-4">
        <h2 className="text-2xl font-bold mb-4">주문정보</h2>
        <div
          className="w-full mx-auto
        [&_div>p]:text-red-600
          [&_div>p]:mb-2
        "
        >
          <div>
            <TextField
              id="orderName"
              label="주문자명"
              variant="outlined"
              required={true}
              onChange={(e) => {
                setUserNameError(!e.target.value);
                setUserName((e.target as HTMLInputElement).value)
              }}
              value={userName}
              helperText="실명 또는 닉네임을 입력해 주세요 ., 익명 식으로 입력하시면 진행이 어렵습니다"
              error={userNameError}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="mb-2">
            <TextField
              id="orderAddress"
              label="이메일"
              variant="outlined"
              required={true}
              onChange={(e) => {
                setEmailError(!e.target.value);
                setEmail((e.target as HTMLInputElement).value)
              }}
              value={email}
              error={emailError}
              sx={{ width: "100%" }}
            />
          </div>
          <TextField
            id="orderPhone"
            label="전화번호"
            variant="outlined"
            value={phone}
            helperText="숫자만 입력해주세요"
            slotProps={{
              htmlInput: {
                maxLength: 11,
              },
            }}
            sx={{ width: "100%" }}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="text-gray-500 py-3 text-sm">
          <p>*결제 후 이메일 주소로 내역이 발송됩니다.</p>
          <p>*결제 후 1일 내로 오픈카톡으로 신청서를 주시지 않으면 자동 주문 취소됩니다.</p>
          <p>*이벤트 상품은 통합 1개만 결제 가능합니다.</p>
        </div>
        <div className="flex mt-5 justify-between items-center">
          <p className="font-bold text-lg">총 금액: {formattedTotalPrice}</p>
          <Button
            variant="contained"
            size="large"
            onClick={onSubmitOrder}
            sx={{
              width: "100%",
              maxWidth: 300,
            }}
            disabled={buttonDisabled}
          >
            결제
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventPaymentForm;
