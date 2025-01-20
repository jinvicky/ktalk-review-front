"use client";

import { useState } from "react";

import { UserSignIn } from "@/types/userType";

const LoginForm = () => {
    const [signInForm, setSignInForm] = useState<UserSignIn>({
        email: '',
        pwd: ''
    });

    const onSubmit = async () => {

        // 기존에 있는 쿠키를 spring boot에 전달
        const resp = await fetch('/next-api/test',  {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                
            },
        })

        console.log('resp', await resp.json());
    }
    
    
    const getCookie = async () => {
        
        // const fetchCookie = await fetch('/api/test/get-cookie', {
        //     method: 'GET',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Jinvicky': 'jvk'
        //     }
        // });
        // await fetchCookie.json();
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