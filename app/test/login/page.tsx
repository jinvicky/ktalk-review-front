"use client";
import { useState } from "react";

import { UserSignIn } from "@/types/userType";
// import { fetchSignIn } from "@/api/userApi";

const LoginPage = () => {
    const [signInForm, setSignInForm] = useState<UserSignIn>({
        email: '',
        pwd: ''
    })

    // const onValidate = () => {

    // };

    const onSubmit = async () => {

        const setCookie = await fetch('/api/test/set-cookie', {
            method: 'GET',
        });
        await setCookie.json();
    }
    
    
    const getCookie = async () => {
        console.log(process.env.NEXT_PUBLIC_DOMAIN_URL, "jvk:???");
        const fetchCookie = await fetch('/api/test/get-cookie', {
            method: 'GET',
            credentials: 'include',
        });
        await fetchCookie.json();
    }

    return <>

        <input
            type="email"
            required
            // value={signInForm.email}
            value={"jinvicky@naver.com"}
            onChange={(e) => setSignInForm({ ...signInForm, email: (e.target as HTMLInputElement).value })}
        />

        <input
            type="password"
            required
            // value={signInForm.pwd}
            value={"1234"}
            onChange={(e) => setSignInForm({ ...signInForm, pwd: (e.target as HTMLInputElement).value })}
        />

        <div>

            <button
                onClick={onSubmit}
            >
                로그인하기
            </button>

            <button onClick={getCookie}>
                쿠키 테스트하기
            </button>
        </div>
    </>;
};

export default LoginPage;