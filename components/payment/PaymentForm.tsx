"use client";
import { useEffect, useState } from "react";

import { addCommaKRW } from "@/utils/number.util";
import { generateUniqueIdByPrfix } from "@/utils/uniqueId.util";

import { Button, TextField } from "@mui/material";

interface PaymentFormProps {
  totalPrice: number;
}

declare const PayApp: PayApp;

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const ordId = generateUniqueIdByPrfix("ORD");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // payapp-lite.js 스크립트 추가
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://lite.payapp.kr/public/api/v2/payapp-lite.js";
    document.body.appendChild(scriptTag);
  }, []);

  const onSubmitPayment = () => {
    PayApp.setDefault("userid", "payapptest"); // 테스트 후에 jinvicky로 수정 예정
    PayApp.setDefault("shopname", "jinvickyCommission");

    PayApp.setParam("goodname", "???"); // 1개일때는 선택한 상품명, 2개 이상일 때는 맨 처음 상품명 왜 n개로 표시
    PayApp.setParam("price", totalPrice.toString());
    PayApp.setParam("recvphone", phone);
    PayApp.setParam("smsuse", "n");
    PayApp.setParam("redirectpay", "1");
    PayApp.setParam("skip_cstpage", "y");
    PayApp.setParam("var1", ordId); // 중복방지를 위해서 주문번호를 var1로 전달
    PayApp.setParam(
      "feedbackurl",
      "https://ktalk-review-image-latest.onrender.com/api/event-sale/payapp-feedback"
    );

    /**
     * 이건 창을 self로 여는 기준으로 만든 코드라서 수정 필요함. returnurl은 백단 개발완료 -> /event/payment/complete으로 이동함
     */
    PayApp.setParam("skip_cstpage", "n"); // n이어야 returnurl 에러 안남
    PayApp.setParam("returnurl", "https://ktalk-review-image-latest.onrender.com/api/event-sale/payapp-redirect");
    PayApp.setTarget("_self");
    PayApp.call();
  };

  const onSubmitOrder = () => {
    const cartItem = JSON.parse(localStorage.getItem("cartItem") || "{}");
    const cartItemList = [];
    for (const key in cartItem) {
      cartItemList.push({
        prodId: key,
        quantity: cartItem[key],
      });
    }
    const json = {
      orderProductVOList: cartItemList,
      ordId: ordId,
      ordUsername: "강지수",
      deliveryType: "EMAIL",
      deliveryAddr: "jinvicky@naver.com",
      ordAmount: totalPrice,
      ordStatus: "ORDERED",
    };

    fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    }).then(async (resp) => {
      const data = (await resp.json()) as ApiResult<number>;

      if (data.status === "OK" && data.data > 0) {
        onSubmitPayment();
      }
    });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력되도록 체크
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
              sx={{ width: "100%" }}
            />
            <p>*신청서 문의 시 주문자명으로 구분합니다.</p>
          </div>
          <div>
            <TextField
              id="orderAddress"
              label="이메일"
              variant="outlined"
              required={true}
              sx={{ width: "100%" }}
            />
            {/* <p>*결제 완료 후, 상세 내역을 이메일로 전달드립니다.</p> */}
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
        <div className="flex mt-5 justify-between items-center">
          <p className="font-bold text-lg">
            총 금액: {addCommaKRW(totalPrice, true)}
          </p>
          <Button
            variant="contained"
            size="large"
            onClick={onSubmitOrder}
            sx={{
              width: "100%",
              maxWidth: 300,
            }}
          >
            결제
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
