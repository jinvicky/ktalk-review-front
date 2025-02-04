"use client";

import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import { TextField, Link } from "@mui/material";
import { generateUniqueIdByPrfix } from "@/utils/uniqueId.util";
import { CommissionPaymentRequest } from "@/types/paymentType";

declare const PayApp: PayApp;

interface PaymentRequestFormProps {
    data: CommissionPaymentRequest;
}

const PaymentRequestForm = ({data}: PaymentRequestFormProps) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // payapp-lite.js 스크립트 추가
        const scriptTag = document.createElement("script");
        scriptTag.src = "https://lite.payapp.kr/public/api/v2/payapp-lite.js";
        document.body.appendChild(scriptTag);
    }, []);
    const requestPrice = 10000;

    const onSubmitPayment = () => {
        const ordId = generateUniqueIdByPrfix("ORD");

        PayApp.setDefault("userid", "payapptest"); // 테스트 후에 jinvicky로 수정 예정
        PayApp.setDefault("shopname", "jinvickyCommission");

        PayApp.setParam("goodname", "commission"); // 1개일때는 선택한 상품명, 2개 이상일 때는 맨 처음 상품명 왜 n개로 표시
        PayApp.setParam("price", requestPrice.toString());
        // PayApp.setParam("recvphone", phone);
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
        PayApp.call();
    };

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white">
            <h1 className="text-3xl font-bold text-center mb-6">결제 요청서</h1>
            <div className="mb-6 text-gray-700">
                <h2 className="text-2xl font-semibold mb-2">커미션이름</h2>
                <div className="text-lg">
                    {data.applyTitle}
                </div>
            </div>
            <div className="mb-6 text-gray-700">
                <h2 className="text-2xl font-semibold mb-2">협의사항</h2>
                <div className="text-lg">
                    {data.discussion}
                </div>
            </div>
            <div className="border-b border-gray-300" />
            <div className="mb-6 text-gray-700 py-3">
                <h2 className="text-2xl font-semibold mb-2">결제 가이드</h2>
                <p>1번의 결제당 1개 결제수단만 이용할 수 있습니다. </p>
                <p>문제 발생시 <Link
                    href="https://open.kakao.com/o/sDj4K9Vf"
                    className="font-bold"
                >
                    오픈카톡
                </Link>으로 문의주세요</p>
            </div>
            <h2 className="text-xl font-semibold mb-5">결제 요청 금액: {requestPrice}원</h2>
            <h2 className="text-xl font-semibold mb-2">계좌이체</h2>
            <p>계좌번호로 입금한 다음에 입금자명을 쓰고 제출을 클릭해 주세요</p>
            <div className="mb-6 text-gray-700 flex items-center gap-3">
                <p className="text-lg">남궁진 하나은행 32591038729807</p>
                <CopyToClipboard
                    text="32591038729807"
                    onCopy={() => setCopied(true)}
                >
                    <button className="px-4 py-2 bg-blue-100 rounded-lg font-bold text-blue-500">
                        계좌복사
                    </button>
                </CopyToClipboard>
                {copied && <span className="text-sm">복사되었습니다</span>}
            </div>
            <div className="my-5 flex gap-3">
                <TextField
                    label="입금자명"
                    variant="outlined"
                    value="이수진"
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => { }}
                >
                    제출
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">페이앱 결제하기</h2>
            <p>네이버/카카오페이 제외 신용카드, 페이코 등의 결제가 가능합니다.</p>
            <button className="mt-3 px-9 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition duration-200">
                결제하기
            </button>
        </div>
    );
};

export default PaymentRequestForm;
