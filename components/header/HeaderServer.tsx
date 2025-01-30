import { cookies } from "next/headers";
import Link from "next/link";

import Header from "./Header";

const HeaderServer = () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    const menuListWithoutAuth = [
        { path: '/user/sign-in', alias: '로그인' },
        { path: '/user/sign-up', alias: '회원가입' },
    ];

    const menuListWithAuth = [
        { path: '/user/sign-out', alias: '로그아웃' },
        { path: '/my-page', alias: '마이페이지' },
    ];

    const renderMenuList = (list: { path: string, alias: string }[]) => {
        return <ul className="flex gap-5">
            {list.map((menu) => {
                return <li key={`drawer-${menu.path}`}>
                    <Link
                        className="text-white font-bold "
                        href={menu.path}
                    >
                        {menu.alias}
                    </Link>
                </li>
            })}
        </ul>
    };
    
    return (
        <div>
            <Header authenticateMenuList={userSession
                ? renderMenuList(menuListWithAuth)
                : renderMenuList(menuListWithoutAuth)}
            />
        </div>
    );
}

export default HeaderServer;