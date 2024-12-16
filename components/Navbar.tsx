"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const NavBar = () => {
  const { i18n } = useTranslation();

  const updateStyle = (lng: "en" | "ja" | "ko") => {
    return twMerge(
      "text-white hover:bg-blue-400 px-3 py-1 rounded",
      i18n.language === lng && "bg-blue-600"
    );
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Jinvicky's Blog</div>
        <ul className="flex center gap-5 text-white text-lg">
          <li>
            <Link href="/promotion">Promotion</Link>
          </li>
          <li>
            <Link href="/review-renewal">Review</Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          <button
            className={updateStyle("en")}
            onClick={() => i18n.changeLanguage("en")}
          >
            EN
          </button>
          <button
            className={updateStyle("ja")}
            onClick={() => i18n.changeLanguage("ja")}
          >
            JA
          </button>
          <button
            className={updateStyle("ko")}
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
