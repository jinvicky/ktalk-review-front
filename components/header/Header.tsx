"use client";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  authMenuList: { path: string, alias: JSX.Element }[];
}
const Header = ({ authMenuList }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const renderMenuList = (list: { path: string, alias: JSX.Element }[]) => {
    return <ul className="flex gap-5 [&>li]:cursor-pointer">
      {list.map((menu) => {

        if (menu.path === '/user/sign-out') {
          return <li key={`drawer-${menu.path}`}>
            <div
              className="text-white font-bold "
              onClick={() => {
                onSignOut();
              }}
            >
              {menu.alias}
            </div>
          </li>
        }
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

  const onSignOut = async () => {
    const resp = await fetch('/next-api/sign-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json() as { status: string, message: string };

    if (data.status !== "200") {
      alert("요청 도중 문제가 발생했습니다. 재시도 혹은 관리자에게 문의해 주세요");
    } else {
      alert("로그아웃에 성공했습니다.");

      if (pathname === '/promotion') {
        router.refresh();
      } else {
        router.push('/promotion');
      }
    }
  }

  return (
    <nav className="sticky top-0 w-full p-4 backdrop-blur bg-gray-700/90 z-10">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Jinvicky Blog
        </Link>
        {renderMenuList(authMenuList)}
      </div>
    </nav>
  );
};

export default Header;
