"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const NavBar = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");

  const updateLngStyle = (lng: "en" | "ja" | "ko") => {
    return twMerge(
      "text-white hover:bg-blue-400 px-3 py-1 rounded",
      currentLanguage === lng && "bg-blue-600"
    );
  };

  useEffect(() => {
    // 클라이언트에서 렌더링 시 언어 설정
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const currentPath = usePathname();

  const isLinkActive = (path: string) =>
    currentPath === path ? "text-blue-200" : "text-white";

  const menuList = [
    { name: "Promotion", path: "/promotion" },
    { name: "Review", path: "/review-renewal" },
    { name: "Product", path: "/product" },
  ];

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Jinvicky Blog
        </Link>
        <ul className="flex center gap-5 text-white text-lg">
          {menuList.map((menu) => (
            <li key={menu.path} className={twMerge(isLinkActive(menu.path))}>
              <Link href={menu.path}>{menu.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <Link href="/cart">
            <div className="flex items-center justify-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white hover:text-blue-500 transition duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l1 9h12l1-9h2M6 21c0 1.104-.896 2-2 2s-2-.896-2-2 1.896-2 2-2 2 .896 2 2zm12 0c0 1.104-.896 2-2 2s-2-.896-2-2 1.896-2 2-2 2 .896 2 2zm-6-4h6l1-9H7l1 9h6z"
                />
              </svg>
            </div>
          </Link>
          <button
            className={updateLngStyle("en")}
            onClick={() => i18n.changeLanguage("en")}
          >
            EN
          </button>
          <button
            className={updateLngStyle("ja")}
            onClick={() => i18n.changeLanguage("ja")}
          >
            JA
          </button>
          <button
            className={updateLngStyle("ko")}
            onClick={() => i18n.changeLanguage("ko")}
          >
            KO
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
