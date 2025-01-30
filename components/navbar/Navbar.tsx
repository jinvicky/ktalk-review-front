"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { twMerge } from "tailwind-merge";

import { Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import Diversity1Icon from '@mui/icons-material/Diversity1';

const NavBar = () => {
  const iconSize = {
    width: "30px",
    height: "30px",
  }
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = usePathname();
  const menuList = [
    { name: "Promotion", path: "/promotion" },
    { name: "Review", path: "/review-renewal", icon: <Diversity1Icon sx={{ width: iconSize.width, height: iconSize.height }} /> },
    { name: "Commisssion", path: "/commission" },
  ];
  const drawerWidth = 240;
  const container =
    typeof window !== "undefined" ? window.document.body : undefined;

  const isLinkActive = (path: string) =>
    currentPath === path ? "font-bold text-red-500" : "text-black";

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const updateLngStyle = (lng: "en" | "ja" | "ko") => {
    return twMerge(
      "hover:bg-blue-400 py-1 rounded",
      currentLanguage === lng && "font-bold text-blue-800"
    );
  };

  useEffect(() => {
    // 클라이언트에서 렌더링 시 언어 설정
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  /**
   * 로그아웃 함수
   */
  const router = useRouter();

  const onSignOUt = async () => {

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
      router.push("/promotion");
    }
  }


  /** 사이드 메뉴 */
  const drawer = (
    <div className="flex flex-col text-lg" onClick={handleDrawerToggle}>
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
    /**
     * pc 화면
     */
    <nav className="sticky top-0 p-4 backdrop-blur bg-white z-10 max-w-48">
      <div className="">
        <div className="block md:hidden cursor-pointer text-white">
          <MenuIcon
            className="w-8 h-8 text-black"
            onClick={handleDrawerToggle}
          />
        </div>
        <ul className="hidden text-lg md:flex flex-col gap-3">
          {menuList.map((menu) => {
            if (menu.name === "Cart") return null;
            return (
              <li key={menu.path} className={twMerge(isLinkActive(menu.path))}>
                <Link href={menu.path}>
                  <div className="flex flex-col items-center">
                    {menu.icon && menu.icon}
                    <div className="text-sm">
                      {menu.name}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden md:flex flex-col mt-3">
          <div
            className={updateLngStyle("en")}
            onClick={() => i18n.changeLanguage("en")}
          >
            EN
          </div>
          <div
            className={updateLngStyle("ja")}
            onClick={() => i18n.changeLanguage("ja")}
          >
            JA
          </div>
          <div
            className={updateLngStyle("ko")}
            onClick={() => i18n.changeLanguage("ko")}
          >
            KO
          </div>
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
