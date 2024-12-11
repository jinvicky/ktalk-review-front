"use client";
import { useTranslation } from "react-i18next";
import Image from 'next/image';

const PromotionPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div>{t("HELLO")}</div>
      <div>현재 브라우저 언어 : {i18n.language}</div>
      <Image src={"/assets/image/AC_NOTE1.jpg"} alt="AC_NOTE1" width={300} height={300}/>
    </>
  );
};

export default PromotionPage;
