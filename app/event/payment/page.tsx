"use client";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { EventProduct } from "@/types/product.type";

import EventPaymentForm from "@/components/event/EventPaymentForm";
import { addCommaKRW, addPayappFee } from "@/utils/number.util";

const EventPayPage = () => {
  const searchParams = useSearchParams();
  const prodId = searchParams.get("prodId");

  const [productDetail, setProductDetail] = useState<EventProduct>();
  const router = useRouter();

  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/event-sale/product/" + prodId
    ).then(async (res) => {
      const data = (await res.json()) as ApiResult<EventProduct>;

      if (data.data.soldOut) {
        alert("품절된 상품입니다.");
        return router.push("/event/product");
      }
      setProductDetail(data.data);
      return res;
    });
  }, [searchParams]);

  const renderProductDetail = (product: EventProduct) => {
    if (prodId === null) {
      return router.push("/event/product");
    }
    return (
      <>
        <div className="flex flex-col gap-20 sm:flex-row justify-center align-center py-9 px-4">
          <div className="relative h-96">
            <Image
              src={product.thumbnail}
              alt="상품 이미지"
              className="w-full h-full object-cover"
              width={1500}
              height={1023}
            />
          </div>
          <div className="">
            <div className="flex items-center border-b border-gray-300 flex-wrap">
              <h2 className="text-3xl font-bold mr-2">{product.name}</h2>
              <p className="text-lg">({product.summary})</p>
            </div>
            <p className="text-pink-400 my-2">{product.content}</p>
            {/* -표시한 원래 제품 원가*/}
            {product.discountRate > 0 && (
              <p className="text-gray-500 text-sm line-through mt-4">
                {addCommaKRW(product.price, true)}
              </p>
            )}
            <div className="flex gap-2 text-xl font-bold">
              {product.discountRate > 0 && (
                <span className="text-pink-400">{product.discountRate}%</span>
              )}
              <p>{addCommaKRW(addPayappFee(product.discountedPrice), true)}</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {productDetail && renderProductDetail(productDetail)}
      {productDetail?.price && (
        <EventPaymentForm
          prodQuantity={productDetail?.quantity}
          totalPrice={productDetail?.discountedPrice}
          prodId={prodId!}
        />
      )}
    </div>
  );
};

export default EventPayPage;
