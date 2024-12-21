"use client";

import { useTranslation } from "react-i18next";

import PromotionCard from "@/components/promotion/PromotionCard";

import "@/styles/promotion/promotionPage.scss";

const PromotionPage = () => {
  const { t } = useTranslation();

  const renderAcnhSection = () => {
    const hashTagKeywords = [
      t("ANIMAL_CROSSING.HASH_TAG.1"),
      t("ANIMAL_CROSSING.HASH_TAG.2"),
      t("ANIMAL_CROSSING.HASH_TAG.3"),
    ];

    const content = (
      // md:[&>.desc]:text-left
      <div className="sm:[&>.desc]:text-center">
        <div className="desc">{t("ANIMAL_CROSSING.PRODUCT.COUPLE.DESC_1")}</div>
        <div className="desc">{t("ANIMAL_CROSSING.PRODUCT.INVITE.DESC_1")}</div>
        <div className="desc">{t("ANIMAL_CROSSING.PRODUCT.INVITE.DESC_2")}</div>
        <div className="desc">{t("ANIMAL_CROSSING.PRODUCT.INVITE.DESC_3")}</div>
        <div className="p-5 text-md font-semibold text-gray-400 text-center">
          🌟 {t("APPLY_CLICK_HERE")} 🌟
        </div>
      </div>
    );
    return (
      <>
        <PromotionCard
          hashTagKeywords={hashTagKeywords}
          hashTagColorStyle={"bg-blue-100 text-blue-600"}
          imgSrc={"/assets/image/acnh_couple.jpeg"}
          title={
            <>
              💗 {t("ANIMAL_CROSSING.PRODUCT.COUPLE.TITLE")},{" "}
              {t("ANIMAL_CROSSING.PRODUCT.INVITE.TITLE")} 💗
            </>
          }
          content={content}
        />
      </>
    );
  };

  const renderPartyCommission = () => {
    const hashTagKeywords = [
      t("PARTY.HASH_TAG.1"),
      t("PARTY.HASH_TAG.2"),
      t("PARTY.HASH_TAG.3"),
      t("PARTY.HASH_TAG.4"),
    ];

    const content = (
      <div className="sm:[&>.desc]:text-center">
        <div className="desc">{t("PARTY.PRODUCT.DESC_1")}</div>
        <div className="desc">{t("PARTY.PRODUCT.DESC_2")}</div>
        <div className="p-5 text-md font-semibold text-gray-400 text-center">
          🌟 {t("APPLY_CLICK_HERE")} 🌟
        </div>
      </div>
    );
    return (
      <PromotionCard
        hashTagKeywords={hashTagKeywords}
        hashTagColorStyle={"bg-orange-100 text-orange-600"}
        imgSrc={"/assets/image/party_smp1.jpeg"}
        title={<>💗 {t("PARTY.LONG_ALIAS")} 💗</>}
        content={content}
      />
    );
  };

  const renderLostArkSection = () => {
    const hashTagKeywords = [
      t("LOST_ARK.HASH_TAG.1"),
      t("LOST_ARK.HASH_TAG.2"),
      t("LOST_ARK.HASH_TAG.3"),
      t("LOST_ARK.HASH_TAG.4"),
    ];

    const content = (
      // md:[&>.desc]:text-left
      <div className="sm:[&>.desc]:text-center">
        <div className="desc">{t("LOST_ARK.PRODUCT.DESC_1")}</div>
        <div className="desc">{t("LOST_ARK.PRODUCT.DESC_2")}</div>
        <div className="p-5 text-md font-semibold text-gray-400 text-center">
          🌟 {t("APPLY_CLICK_HERE")} 🌟
        </div>
      </div>
    );
    return (
      <>
        <PromotionCard
          hashTagKeywords={hashTagKeywords}
          hashTagColorStyle={"bg-green-100 text-green-600"}
          imgSrc={"/assets/image/lostark_couple.jpeg"}
          title={<>💗 {t("LOST_ARK.LONG_ALIAS")} 💗</>}
          content={content}
        />
      </>
    );
  };

  return (
    <div className="p-5">
      <div>
        <div className="text-3xl font-bold text-center">
          {t("SD_COMMISSION")}
        </div>
      </div>
      <a href="https://crepe.cm/@jinvicky/crf0exx" target="_blank">
        {renderAcnhSection()}
      </a>
      <a href="https://crepe.cm/@jinvicky/crf0exx" target="_blank">
        {renderLostArkSection()}
      </a>
      <a href="https://crepe.cm/@jinvicky/crf0exx" target="_blank">
        {renderPartyCommission()}
      </a>
    </div>
  );
};

export default PromotionPage;
