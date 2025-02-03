"use client";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  menuList: { path: string, alias: JSX.Element }[];
}
const Header = ({ menuList }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

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
    <nav className="sticky top-0 w-full px-3 py-2 backdrop-blur bg-gray-700/90 z-10">
      <div className="flex justify-between items-center">
        <Link href="/promotion" className="text-white text-lg font-bold">
          Jinvicky Blog
        </Link>
        <ul className="flex gap-5 [&>li]:cursor-pointer">
          {menuList.map((menu) => {
            return <li key={`drawer-${menu.path}`}>
              {menu.path === '/user/sign-out'
                ? <div
                  className="text-white"
                  onClick={onSignOut}
                >
                  {menu.alias}
                </div>
                : <Link
                  className="text-white"
                  href={menu.path}
                >
                  {menu.alias}
                </Link>
              }
            </li>
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
