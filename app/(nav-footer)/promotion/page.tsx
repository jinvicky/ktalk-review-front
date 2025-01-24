"use client";

import { useTranslation } from "react-i18next";

import { useRouter } from 'next/navigation';

import PromotionCard from "@/components/promotion/PromotionCard";

import "@/styles/promotion/promotionPage.scss";

const PromotionPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="p-5">
      <div>
        <div className="text-3xl font-bold text-center">
          {t("SD_COMMISSION")}
        </div>
      </div>
      <PromotionCard
        hashTagKeywords={[
          t("ANIMAL_CROSSING.HASH_TAG.1"),
          t("ANIMAL_CROSSING.HASH_TAG.2"),
          t("ANIMAL_CROSSING.HASH_TAG.3"),
        ]}
        hashTagColorStyle={"bg-blue-100 text-blue-600"}
        imgSrc={"/assets/image/acnh_couple.jpeg"}
        url={"https://crepe.cm/@jinvicky/crf0exx"}
        title={
          <>
            💗 {t("ANIMAL_CROSSING.PRODUCT.COUPLE.TITLE")},{" "}
            {t("ANIMAL_CROSSING.PRODUCT.INVITE.TITLE")} 💗
          </>
        }
        content={
          <div className="sm:[&>.desc]:text-center">
            <div className="desc">
              {t("ANIMAL_CROSSING.PRODUCT.COUPLE.DESC_1")}
            </div>
            <div className="desc">
              {t("ANIMAL_CROSSING.PRODUCT.INVITE.DESC_1")}
            </div>
            <div className="desc">
              {t("ANIMAL_CROSSING.PRODUCT.INVITE.DESC_2")}
            </div>
            <div className="desc">
              {t("ANIMAL_CROSSING.PRODUCT.INVITE.DESC_3")}
            </div>
            {/* <div className="p-5 text-md font-semibold text-gray-400 text-center">
              🌟 {t("APPLY_CLICK_HERE")} 🌟
            </div> */}
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold my-5 py-2 px-4 rounded"
              onClick={()=> router.push("/commission")}
            >
              회원가입하고 신청하기
            </button>
          </div>
        }
      />
      <PromotionCard
        hashTagKeywords={[
          t("LOST_ARK.HASH_TAG.1"),
          t("LOST_ARK.HASH_TAG.2"),
          t("LOST_ARK.HASH_TAG.3"),
          t("LOST_ARK.HASH_TAG.4"),
        ]}
        hashTagColorStyle={"bg-green-100 text-green-600"}
        imgSrc={"/assets/image/lostark_couple.jpeg"}
        title={<>💗 {t("LOST_ARK.LONG_ALIAS")} 💗</>}
        url={"https://crepe.cm/@jinvicky/crf0exx"}
        content={
          <div className="sm:[&>.desc]:text-center">
            <div className="desc">{t("LOST_ARK.PRODUCT.DESC_1")}</div>
            <div className="desc">{t("LOST_ARK.PRODUCT.DESC_2")}</div>
            <div className="p-5 text-md font-semibold text-gray-400 text-center">
              🌟 {t("APPLY_CLICK_HERE")} 🌟
            </div>
          </div>
        }
      />
      <PromotionCard
        hashTagKeywords={[
          t("PARTY.HASH_TAG.1"),
          t("PARTY.HASH_TAG.2"),
          t("PARTY.HASH_TAG.3"),
          t("PARTY.HASH_TAG.4"),
        ]}
        hashTagColorStyle={"bg-orange-100 text-orange-600"}
        imgSrc={"/assets/image/party_smp1.jpeg"}
        title={<>💗 {t("PARTY.LONG_ALIAS")} 💗</>}
        url={"https://crepe.cm/@jinvicky/crf0exx"}
        content={
          <div className="sm:[&>.desc]:text-center">
            <div className="desc">{t("PARTY.PRODUCT.DESC_1")}</div>
            <div className="desc">{t("PARTY.PRODUCT.DESC_2")}</div>
            <div className="p-5 text-md font-semibold text-gray-400 text-center">
              🌟 {t("APPLY_CLICK_HERE")} 🌟
            </div>
          </div>
        }
      />
    </div>
  );
};

export default PromotionPage;
