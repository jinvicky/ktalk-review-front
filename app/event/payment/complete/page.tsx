"use client";

import React, { useEffect, useState } from 'react';
import { SvgIcon } from '@mui/material';
import { useSearchParams } from "next/navigation";
import { PaymentState } from '@/types/payment.type';
import ErrorIcon from '@mui/icons-material/Error';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

/** 이벤트상품 결제완료 페이지 */
const EventPaymentCompletePage = () => {
    const [isOpener, setIsOpener] = useState<boolean>(true); // 부모창이 열려있는지 여부입니다.
    const searchParams = useSearchParams();
    const isPaid = searchParams.get("isPaid");
    const state = searchParams.get("state");
    const userName = searchParams.get("userName");

    useEffect(() => {
        const queryObject = Object.fromEntries(searchParams.entries());
        const message = JSON.stringify(queryObject);
        if (window.opener) {
            window.opener.postMessage(message, "https://ktalk-review.netlify.app/");
            window.close();
        } else setIsOpener(false);
    }, [searchParams]);

    /** 부모창이 열려있으면 빈화면 */
    if (isPaid && isOpener) return <></>;

    return (
        <>
            {!isPaid && <NavBar />}
            <div className="flex flex-col items-center justify-center h-screen p-3 bg-white">
                {/* 결제완료 */}
                {state === PaymentState.Complete && <>
                    <SvgIcon sx={{ fontSize: 100 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="yellow" />
                        <circle cx="8" cy="9" r="1.5" fill="black" />
                        <circle cx="16" cy="9" r="1.5" fill="black" />
                        <path
                            d="M8 15c1.5 2 4.5 2 6 0"
                            stroke="black"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </SvgIcon>
                    <h2 className="mt-4 text-2xl font-bold text-center text-gray-800">
                        결제가 완료되었습니다!
                    </h2>
                    <p className="mt-2 text-center font-bold">
                        주문자명: {userName}
                    </p>
                    <p className="mt-2 text-center text-gray-600">
                        이메일을 확인한 뒤, 오픈카톡으로 신청서를 꼭 보내주세요.
                    </p>
                </>}
                {/* 결제실패 */}
                {state !== PaymentState.Complete && <>
                    <ErrorIcon color='error' sx={{
                        width: "100px",
                        height: "100px",
                    }} />
                    <h2 className="mt-4 text-2xl font-bold text-center text-gray-800">
                        결제가 실패하였습니다!
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        계속 결제가 실패하는 경우 관리자에게 문의 바랍니다.
                    </p>
                </>}
            </div>
            {!isPaid && <Footer />}
        </>
    );
};

export default EventPaymentCompletePage;
