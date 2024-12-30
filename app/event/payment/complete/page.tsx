import React from 'react';
import { SvgIcon } from '@mui/material'; // Material-UI의 SvgIcon을 사용

const EventPaymentCompletePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-3 bg-white">
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
            <p className="mt-2 text-center text-gray-600">
                이메일을 확인한 뒤, 오픈카톡으로 신청서를 꼭 보내주세요.
            </p>
        </div>
    );
};

export default EventPaymentCompletePage;
