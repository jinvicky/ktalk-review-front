"use client";

import { addCommaKRW } from "@/utils/number.util";
import { generateUniqueIdByPrfix } from "@/utils/uniqueId.util";

interface PaymentFormProps {
  totalPrice: number;
}

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const ordId = generateUniqueIdByPrfix("ORD");

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
