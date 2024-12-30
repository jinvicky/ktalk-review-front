"use client";

import React, { useEffect, useState } from 'react';

/** 테스트중... */
const PaymentCompleteRedirect = () => {
    const [urlParams, setUrlParams] = useState<URLSearchParams>();
    console.log("?? searchParams:", urlParams?.get("type"));

    useEffect(() => {
        setUrlParams(new URLSearchParams(location.search));
        if (window.opener) {
            window.opener.postMessage("Hello from child1");
            window.close();
        }
    }, []);

    return <></>;
};

export default PaymentCompleteRedirect;
