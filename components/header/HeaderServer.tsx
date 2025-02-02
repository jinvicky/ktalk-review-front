import { cookies } from "next/headers";
import Link from "next/link";

import Header from "./Header";

const HeaderServer = () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    const menuListWithoutAuth = [
        { path: '/user/sign-in', alias: '로그인' },
        { path: '/user/sign-up', alias: '회원가입' },
        { path: '/non-user/purchase/search', alias : '비회원 구매 조회'}
    ];

    const menuListWithAuth = [
        { path: '/user/sign-out', alias: '로그아웃' },
        { path: '/my-page/commission', alias: '마이페이지' },
    ];

    return (
        <div>
            <Header authMenuList={userSession ? menuListWithAuth : menuListWithoutAuth}
            />
        </div>
    );
}

export default HeaderServer;