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

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">{"Jinvicky's Blog"}</div>
        <ul className="flex center gap-5 text-white text-lg">
          <li className={twMerge(isLinkActive("/promotion"))}>
            <Link href="/promotion">Promotion</Link>
          </li>
          <li className={twMerge(isLinkActive("/review-renewal"))}>
            <Link href="/review-renewal">Review</Link>
          </li>
        </ul>
        <div className="flex space-x-4">
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
