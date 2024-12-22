"use client";
import { useTranslation } from "react-i18next";

import ProductList from "@/components/product/ProductList";

const ProductPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 text-center font-bold">{t("NOT_SUPPORT_GO")}</div>
      <div className="mx-auto flex justify-center">
        <ProductList />
      </div>
    </>
  );
};

export default ProductPage;
