"use client";

import { addCommaKRW } from "@/utils/number.util";
import { generateUniqueIdByPrfix } from "@/utils/uniqueId.util";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface PaymentFormProps {
  totalPrice: number;
}

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const ordId = generateUniqueIdByPrfix("ORD");
  const [phone, setPhone] = useState("");

  // 주문 post api 호출 테스트
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
    }).then((resp) => {
      console.log(resp);
    });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력되도록 체크
    const newValue = event.target.value;
    setPhone(newValue.replace(/[^0-9]/g, ""));
  }

  return (
    <>
      <div className="border-t-2 border-black p-4">
        <h2 className="text-2xl font-bold mb-4">주문정보</h2>
        <div className="w-full mx-auto
        [&_div>p]:text-red-600
          [&_div>p]:mb-2
        ">
          <div>
            <TextField id="orderName" label="주문자명" variant="outlined" required={true} sx={{ width: "100%" }} />
            <p>
              *신청서 문의 시 주문자명으로 구분합니다.
            </p>
          </div>
          <div>
            <TextField id="orderAddress" label="이메일" variant="outlined" required={true} sx={{ width: "100%" }} />
            <p>
              *결제 완료 후, 상세 내역을 이메일로 전달드립니다.
            </p>
          </div>
          <TextField id="orderPhone" label="전화번호" variant="outlined"
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
          <p className="font-bold text-lg">총 금액: {addCommaKRW(totalPrice, true)}</p>
          <Button variant="contained" size="large" onClick={onSubmitOrder}
            sx={{
              width: "100%",
              maxWidth: 300
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
