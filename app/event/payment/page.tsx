"use client";
import { useEffect, useState } from "react";

import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";

import { EventProduct } from "@/types/product.type";

import EventPaymentForm from "@/components/event/EventPaymentForm";

const EventPayPage = () => {
  const searchParams = useSearchParams();
  const prodId = searchParams.get("prodId");

  const [productDetail, setProductDetail] = useState<EventProduct>();

  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/event-sale/product/" + prodId
    ).then(async (res) => {
      const data = (await res.json()) as ApiResult<EventProduct>;
      setProductDetail(data.data);
      return res;
    });
  }, [searchParams]);

  const renderProductDetail = (product: EventProduct) => {
    if (prodId === null) {
      return redirect("/event/product");
    }
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-center align-center gap-2">
          <div className="relative h-96">
            <Image
              src={product.thumbnail}
              alt="상품 이미지"
              className="w-full h-full object-cover"
              width={1500}
              height={1023}
            />
          </div>
          <div className="sm:">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.summary}</p>
            <p className="text-gray-600 mt-2">{product.content}</p>
            <p className="text-md font-bold mt-2">₩{product.price}</p>
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
          totalPrice={productDetail?.price}
          prodId={prodId!}
        />
      )}
    </div>
  );
};

export default EventPayPage;
