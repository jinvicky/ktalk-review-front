"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { twMerge } from "tailwind-merge";

import { Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'; // Material-UI Menu 아이콘

const NavBar = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = usePathname();
  const menuList = [
    { name: "Promotion", path: "/promotion" },
    { name: "Review", path: "/review-renewal" },
    { name: "Commisssion", path: "/commission" },
    // { name: "Event", path: "/event/product" },
    // { name: "Product", path: "/product" },
    // { name: "Cart", path: "/cart" },
  ];
  const drawerWidth = 240;
  const container =
    typeof window !== "undefined" ? window.document.body : undefined;

  const isLinkActive = (path: string) =>
    currentPath === path ? "text-blue-200" : "text-white";

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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

  /** 사이드 메뉴 */
  const drawer = (
    <div className="flex flex-col text-lg" onClick={handleDrawerToggle}>
      <Link className="w-full font-bold p-3 border-b-4 text-center" href="/">
        Jinvicky Blog
      </Link>
      <div className="flex flex-col w-full">
        {menuList.map((menu) => (
          <Link
            key={`drawer-${menu.path}`}
            className="p-3 w-full border-b-2 text-center"
            href={menu.path}
          >
            {menu.name}
          </Link>
        ))}
        <div className="flex gap-5 justify-center mt-10">
          <button
            className={twMerge(currentLanguage === "en" && "text-blue-600")}
            onClick={() => i18n.changeLanguage("en")}
          >
            EN
          </button>
          /
          <button
            className={twMerge(currentLanguage === "ja" && "text-blue-600")}
            onClick={() => i18n.changeLanguage("ja")}
          >
            JA
          </button>
          /
          <button
            className={twMerge(currentLanguage === "ko" && "text-blue-600")}
            onClick={() => i18n.changeLanguage("ko")}
          >
            KO
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 w-full p-4 backdrop-blur bg-gray-700/90 z-10">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Jinvicky Blog
        </Link>
        <ul className="hidden center gap-5 text-white text-lg md:flex">
          {menuList.map((menu) => {
            if (menu.name === "Cart") return null;
            return (
              <li key={menu.path} className={twMerge(isLinkActive(menu.path))}>
                <Link href={menu.path}>{menu.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden space-x-4 md:flex">
          {/* <Link href="/cart">
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
          </Link> */}
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
        <div className="block md:hidden cursor-pointer text-white">
          <MenuIcon
            className="w-8 h-8 text-white"
            onClick={handleDrawerToggle}
          />
        </div>
      </div>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            disableScrollLock: true, // Scroll Lock을 비활성화
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </nav>
  );
};

export default NavBar;
