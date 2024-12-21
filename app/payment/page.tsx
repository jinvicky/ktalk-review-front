"use client";

import { useEffect } from "react";

interface PayApp {
    setDefault: (key: string, value: string) => void;
    setParam: (key: string, value: string) => void;
    call: () => void;
}

declare const PayApp: PayApp;

const PaymentPage = () => {
    useEffect(() => {
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://lite.payapp.kr/public/api/v2/payapp-lite.js';
        document.body.appendChild(scriptTag);
    }, []);

    const onSubmit = () => {
        PayApp.setDefault('userid', 'payapptest');
        PayApp.setDefault('shopname', '펫키지');

        PayApp.setParam("goodname", "USB");
        PayApp.setParam("price", "1000");
        PayApp.setParam('recvphone', '01000000000');
        PayApp.setParam('smsuse', 'n');
        PayApp.setParam('redirectpay', '1');
        PayApp.setParam('skip_cstpage', 'y');
        PayApp.call();
    };

    return <>
        <form name="MyForm">
            <input type="hidden" name="userid" value="payapptest" />
            <input type="hidden" name="shopname" value="펫키지" />
            <input type="hidden" name="goodname" value="USB" />
            <input type="hidden" name="price" value="1000" />
        </form>
        <button onClick={onSubmit}>결제하기 버튼</button>
    </>;
};

export default PaymentPage;