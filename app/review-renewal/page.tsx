"use client";
// import { useTranslation } from "react-i18next";

// import ReviewForm from "@/components/review/ReviewForm";
import RenewalReviewListWithInfiniteScroll from "@/components/review-renewal/RenewalReviewListWithInfiniteScroll";

const RenewalReviewPage = () => {
  // const { t } = useTranslation();
  return (
    <div className="bg-blue-100">
      {/* <div className="py-5">
        <h1 className="text-2xl text-center font-bold ">
          {t("COMMISSION")} {t("REVIEW.TITLE")}
        </h1>
        <div className="px-5 pt-3 text-md text-center">
          {t("REVIEW.DESC_1")}
        </div>
      </div>
      <ReviewForm /> */}
      <RenewalReviewListWithInfiniteScroll />
    </div>
  );
};

export default RenewalReviewPage;
