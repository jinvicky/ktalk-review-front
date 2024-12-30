"use client";

import React from "react";

import useSWR from 'swr';

import Image from "next/image";

import { fetchGetEventProductList } from "@/api/eventSale.service";

import { EventProduct } from "@/types/product.type";

import { addPayappFee } from "@/utils/number.util";

import { twMerge } from "tailwind-merge";
import { Button } from "@mui/material";

import Loading from "../Loading";

const ProductList = () => {
  const { data: productList, error } = useSWR<EventProduct[]>("/api/event-sale/product/all", fetchGetEventProductList);

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
          <p className="text-md font-bold mt-2">₩ {addPayappFee(item.price)}</p>
          <Button
            className={twMerge(
              "w-full mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold",
              item.soldOut && "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
            )}
            onClick={routeToPayment}>
            {item.soldOut ? "품절" : "결제하기"}
          </Button>
        </div>
      </div>
    );
  };

  if (error) {
    return <div>Error</div>
  }

  if (!productList) {
    return <Loading />
  }

  return (
    <>
      <div className="container p-6">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {productList.map((item: EventProduct, idx: number) => renderProductCard(item, idx))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
