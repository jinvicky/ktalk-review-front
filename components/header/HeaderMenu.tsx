
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { twMerge } from "tailwind-merge";

const HeaderMenu = () => {
    const currentPath = usePathname();
    const menuList = [
        { name: "홍보", path: "/promotion" },
        { name: "커미션", path: "/commission" },
    ];
    const matchedCss = (path: string) => currentPath.startsWith(path) ? "font-bold text-blue-700 border-b-[2px] border-blue-800" : "text-black";

    return (
        <nav className="sticky top-0 backdrop-blur bg-white border-r border-gray-300 z-10">
            <ul className="flex justify-center">
                {menuList.map((menu) => {
                    if (menu.name === "Cart") return null;
                    return (
                        <li
                            key={menu.path}
                            className={twMerge("cursor-pointer [&>a]:cursor-pointer text-md px-4 py-3 text-center hover:bg-blue-50", matchedCss(menu.path))}
                        >
                            <Link href={menu.path}>
                                {menu.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default HeaderMenu;
