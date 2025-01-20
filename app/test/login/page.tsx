import { cookies } from 'next/headers'

import { fetchFromSpringBoot } from "@/api/server/serverUserApi";
import LoginForm from './component/LoginForm';
import Cookie from '@/components/server/Cookie';

const LoginPage = () => {
    const authToken = cookies().get('auth_token')?.value || '';
    const headers = new Headers();
    headers.set("auth_token", authToken);

    fetchFromSpringBoot(headers).then((data) => {
        throw new Error('error 100');
    }).catch((e) => {
        console.log('error 100:', e);
    });

    fetchFromSpringBoot(headers).then((data) => {
        console.log('call 102:', data);
    });

    // fetchFromSpringBoot(headers).then((data) => {
    //     console.log('call 103:', data);
    // });

    return <>
        <Cookie />
        <LoginForm />
    </>;
};

export default LoginPage;