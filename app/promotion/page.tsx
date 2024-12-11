"use client";
import { useTranslation } from "react-i18next";

const PromotionPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div>{t("HELLO")}</div>
      <button className="bg-red-200" onClick={() => i18n.changeLanguage("jp")}>
        일본어로 바꾸기
      </button>
      <button className="bg-blue-200" onClick={() => i18n.changeLanguage("en")}>
        영어로 바꾸기
      </button>
    </>
  );
};

export default PromotionPage;
