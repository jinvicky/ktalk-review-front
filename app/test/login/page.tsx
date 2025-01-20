import LoginForm from "./component/LoginForm";
import {cookies} from  'next/headers'

const LoginPage = () => {

    // 여기가 서버
    console.log('jvk',cookies().get('auth_token'));

    const onFetchCookie = async () => {

    };

    

    return <>

       <LoginForm />
    </>;
};

export default LoginPage;