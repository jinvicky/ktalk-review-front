"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

import { twMerge } from "tailwind-merge";

const SideNav = () => {

    const pathname = usePathname();

    const menuList = [
        {
            name: "내 정보 조회/수정",
            link: "/my-page/profile"
        },
        {
            name: "커미션 신청 내역",
            link: "/my-page/commission"
        },
        // {
        //     name: "굿즈 주문 내역",
        //     link: "/my-page/goods"
        // },
    ]
    return (
        <div className="text-black w-64 h-full ">
            <ul className="divide-y divide-x divide-gray-300 border border-gray-300">
                {menuList.map((menu, index) => (
                    <li key={index} className="p-4">
                        <Link href={menu.link}
                            className={twMerge("text-lg font-semibold hover:text-blue-400 transition-colors duration-300"
                                , pathname === menu.link ? "text-blue-400" : ""
                            )}
                        >
                            {menu.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideNav;