import Link from "next/link";
import Header from "./Header";
import { cookies } from "next/headers";

const HeaderServer = () => {

    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    const authenticateMenuList = () => {
        if (userSession) {
            return <>
                <li key={`drawer-/my-page`}>
                    <Link
                        href="/my-page"
                    >
                        마이페이지
                    </Link>
                </li>
                <li>
                    <Link href="/user/sign-out">로그아웃</Link>
                </li>
            </>
        } else {
            return <>
                <li>
                    <Link href="/user/sign-in">로그인</Link>
                </li>
                <li>
                    <Link href="/user/sign-up">회원가입</Link>
                </li>
            </>
        }
    }
    return (
        <div>
            <Header authenticateMenuList={authenticateMenuList()} />
        </div>
    );
}

export default HeaderServer;