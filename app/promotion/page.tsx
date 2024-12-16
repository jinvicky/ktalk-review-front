"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { twJoin } from "tailwind-merge";

const PromotionPage = () => {
  const { t, i18n } = useTranslation();

  // color 따라 미지원이 있어서 공통으로 빼긴 애매함.
  const tagColorStyle = (color: string) =>
    `bg-${color}-100 text-${color}-700`;

  const tagStyle = "px-4 py-2 rounded-lg text-md";

  return (
    <>
      <Image
        src={"/assets/image/AC_NOTE1.jpg"}
        alt="AC_NOTE1"
        width={300}
        height={300}
      />
      <div className="flex flex-wrap space-x-2">
        <span className={twJoin( tagStyle, tagColorStyle("blue"))}>#디자인</span>
        <span className={twJoin( tagStyle, tagColorStyle("orange"))}>#디자인</span>
        <span className={twJoin( tagStyle, tagColorStyle("green"))}>#디자인</span>
        <span className={twJoin( tagStyle, tagColorStyle("red"))}>#디자인</span>
      </div>
    </>
  );
};

export default PromotionPage;
