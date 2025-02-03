import { cookies } from "next/headers";

import Header from "./HeaderClient";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const HeaderServer = () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    const menuListWithoutAuth = [
        { path: '/user/sign-in', alias: <>로그인</> },
        { path: '/user/sign-up', alias: <>회원가입</> },
        { path: '/non-user/purchase/search', alias : <>비회원 조회</>}
    ];

    const menuListWithAuth = [
        { path: '/user/chat', alias: <MailOutlineIcon /> },
        { path: '/my-page/commission', alias: <>마이페이지</> },
        { path: '/user/sign-out', alias: <>로그아웃</> },
    ];

    return (
        <div>
            <Header menuList={userSession ? menuListWithAuth : menuListWithoutAuth} />
        </div>
    );
}

export default HeaderServer;