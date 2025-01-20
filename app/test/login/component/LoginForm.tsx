"use client";

import { useState } from "react";

import { UserSignIn } from "@/types/userType";

const LoginForm = () => {
    const [signInForm, setSignInForm] = useState<UserSignIn>({
        email: '',
        pwd: ''
    });

    const onSubmit = async () => {

    
    }
    
    
    const getCookie = async () => {
        

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
}

export default LoginForm;