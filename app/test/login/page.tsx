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

        const resp = await setCookie.json();

    }
    
    
    const getCookie = async () => {
        const fetchCookie = await fetch('/api/test/get-cookie', {
            method: 'GET',
            credentials: 'include',
        });

        const resp = await fetchCookie.json();
    }

    return <>

        <input
            type="email"
            required
            value={signInForm.email}
            onChange={(e) => setSignInForm({ ...signInForm, email: (e.target as HTMLInputElement).value })}
        />

        <input
            type="password"
            required
            value={signInForm.pwd}
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