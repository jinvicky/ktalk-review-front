"use client";

import { TextField, Button, Link } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";

const PaymentRequestForm = () => {
    return (
        <div className="p-8 max-w-3xl mx-auto bg-white">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-6">결제 요청서</h1>

            {/* Agreement Section */}
            <div className="mb-6 text-gray-700">
                <h2 className="text-2xl font-semibold mb-2">협의사항</h2>

                <div className="text-lg">
                    스케치 1주일, 최종 완성까지 2주 소요됩니다.
                </div>
            </div>

            <div className="border-b border-gray-300" />

            {/* Payment Guide */}
            <div className="mb-6 text-gray-700 py-3">
                <h2 className="text-2xl font-semibold mb-2">결제 가이드</h2>
                <p>1 결제당 결제수단은 1개만 이용할 수 있습니다. </p>
                <p>문제 발생시 <Link
                    href="https://open.kakao.com/o/sDj4K9Vf"
                    className="font-bold"
                >
                    오픈카톡
                </Link>으로 문의주세요</p>
            </div>

            {/* Account Information */}
            <p>계좌이체시 아래 계좌번호로 입금한 다음에 입금자명을 쓰고 제출을 클릭해 주세요</p>
            <div className="mb-6 text-gray-700 flex items-center">
                <p className="text-lg">하나은행 남궁진 xxxx-xx-xxxx-xxx</p>
                <CopyToClipboard
                    text="하나은행 남궁진 xxxx-xx-xxxx-xxx"
                    onCopy={() => alert("계좌번호가 복사되었습니다.")}
                >
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                        계좌복사
                    </button>
                </CopyToClipboard>

            </div>
            <div className="my-5 flex items-center">
                <TextField
                    label="입금자명"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value="이수진"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                    제출
                </button>
            </div>

            {/* Payment Button */}
            <div className="mt-4">
                <button className="mt-3 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                    페이앱 결제하기
                </button>
            </div>
        </div>
    );
};

export default PaymentRequestForm;
