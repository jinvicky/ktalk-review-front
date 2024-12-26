"use client";

import { useEffect } from "react";

import { addCommaKRW } from "@/utils/number.util";
import { generateUniqueIdByPrfix } from "@/utils/uniqueId.util";

interface PaymentFormProps {
  totalPrice: number;
}

declare const PayApp: PayApp;

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const ordId = generateUniqueIdByPrfix("ORD");

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
    // PayApp.setParam("recvphone", "01000000000");
    PayApp.setParam("smsuse", "n");
    PayApp.setParam("redirectpay", "1");
    PayApp.setParam("skip_cstpage", "y");
    PayApp.setParam(
      "feedbackurl",
      "https://ktalk-review-image-latest.onrender.com/api/temp-payment/save"
    );
    PayApp.call();
  }

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

      // resp.json().then((data) => {}), -> 관련 코드는 ApiResult 타입 검색해서 참고, 성공시 onSubmitPayment() 호출
      // onSubmitPayment();
    });

    // 모든 것이 끝나면 localStorage 초기화 
    localStorage.removeItem("cartItem");
  };

  return (
    <>
      <div className="bg-blue-100">
        총 {addCommaKRW(totalPrice, true)}
        <div className="w-full mx-auto p-5">
          {/* <form className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md"> */}
          <div className="flex"></div>
          <input
            type="text"
            name="addressDetail"
            placeholder="주문자명을 입력해 주세요"
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
          <p className="text-rose-400">
            *신청서 문의 시 주문자명으로 구분합니다. 장난으로 적지 말아주세요.
          </p>
          <p className="text-rose-400">
            *결제 완료 후, 상세 내역을 이메일로 전달드립니다.
          </p>
          <input
            type="text"
            name="addressDetail"
            placeholder="이메일을 입력해 주세요"
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
          <input
            type="text"
            name="addressDetail"
            placeholder="전화번호를 -제외 입력해 주세요"
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
          <button
            className="bg-blue-400 text-white font-semibold rounded-md p-2 hover:bg-blue-700 transition duration-200"
            onClick={onSubmitOrder}
          >
            결제
          </button>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
