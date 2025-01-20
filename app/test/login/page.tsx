import { cookies } from 'next/headers'

import { fetchFromSpringBoot } from "@/app/api/server/serverUserApi";
import LoginForm from './component/LoginForm';
import Cookie from '@/components/server/Cookie';

const LoginPage = () => {
    const authToken = cookies().get('auth_token')?.value || '';
    const headers = new Headers();
    headers.set("auth_token", authToken);

    fetchFromSpringBoot(headers).then((data)=> {
        console.log('call 101:', data);
    })

    return <>
        <Cookie />
        <LoginForm />
    </>;
};

export default LoginPage;