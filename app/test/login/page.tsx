import { cookies } from 'next/headers'

import { fetchFromSpringBoot } from "@/api/userApi";

import LoginForm from "./component/LoginForm";
import TestButton from './component/TestButton';

const LoginPage = async () => {
    const authToken = cookies().get('auth_token')?.value || '';

    const headers = new Headers();
    headers.set("auth_token", authToken);

    const resp = await fetchFromSpringBoot(headers);
    console.log('LoginPage', resp);

    return <>

        tes
    </>;
};

export default LoginPage;