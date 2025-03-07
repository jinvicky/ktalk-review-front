"use client";

import BankTransferPayForm from "@/components/payment/BankTransferPayForm";

const PayRequestArea = () => {
    return <>
        <div>
            <a className="flex items-center py-5" href="#pay-request-section">
                <h1 className="text-2xl font-bold">결제요청서</h1>
            </a>
            <div id="pay-request-section" className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                <div>
                    <div className="text-lg font-semibold text-gray-600">협의사항</div>
                    <div className="pt-3 text-gray-800">영수증: 인당 1.5로 부과되었습니다.(2025.03.07)</div>
                </div>
                <div className="flex items-center space-x-2 text-lg font-semibold">
                    <span className="text-gray-600">결제하기</span>
                </div>
                <div className="p-3">
                    <BankTransferPayForm />
                </div>
                {/* {payRequestVO ? <>
                    <div>결제 요청 금액: {payRequestVO.price}</div>

                    <div>
                        협의사항: {payRequestVO.discussion}
                    </div>
                    <div>
                        결제요청날짜: {payRequestVO.rgtrDtFomatted}
                    </div>
                </> : <div className="py-5">결제 요청서가 없습니다.</div>
                } */}
            </div>
        </div>
    </>
};

export default PayRequestArea;