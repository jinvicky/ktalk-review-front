"use client";

import React from "react";
import useSWR from "swr";
import Image from "next/image";
import { fetchGetEventProductList } from "@/api/eventSale.service";
import { EventProduct } from "@/types/product.type";

import { addCommaKRW, addPayappFee } from "@/utils/number.util";

import { twMerge } from "tailwind-merge";
import { Button } from "@mui/material";

import RequestLoading from "../RequestLoading";

const ProductList = () => {
  const { data: productList, error } = useSWR<EventProduct[]>(
    "/api/event-sale/product/all",
    fetchGetEventProductList
  );

  const renderProductCard = (item: EventProduct, seq: number) => {
    const routeToPayment = () => {
      if (item.soldOut) {
        alert("품절된 상품입니다.");
        return;
      }
      location.href = "/event/payment?prodId=" + item.id;
    };
    return (
      <div
        className={twMerge(
          "bg-white rounded-lg shadow-lg w-64 overflow-hidden",
          item.soldOut && "opacity-50 cursor-not-allowed"
        )}
        key={seq}
      >
        <div className="relative w-full h-full">
          <Image
            src={item.thumbnail}
            alt="상품 이미지"
            className="bg-gray-100"
            width={685}
            height={1023}
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-600 mt-2">{item.summary}</p>
          <p className="text-md font-bold mt-2">
            {addCommaKRW(addPayappFee(item.discountedPrice), true)}
          </p>
          <Button
            onClick={routeToPayment}
            sx={{
              width: "100%",
              marginTop: "10px",
              cursor: item.soldOut ? "not-allowed" : "cursor",
            }}
            variant="contained"
          >
            {item.soldOut ? "품절" : "결제하기"}
          </Button>
        </div>
      </div>
    );
  };

  if (error) {
    return <div>Error</div>;
  }

  if (!productList) {
    return <RequestLoading />;
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {productList.map((item: EventProduct, idx: number) =>
            renderProductCard(item, idx)
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
