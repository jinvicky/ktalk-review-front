"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { EventProduct } from "@/types/product.type";

import { Button } from "@mui/material";

const ProductList = () => {
  const [productList, setProductList] = useState<EventProduct[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/event-product/all").then(
      async (res) => {
        const data = (await res.json()) as ApiResult<EventProduct[]>;
        setProductList(data.data);
      }
    );
  }, []);

  const renderProductCard = (item: EventProduct, seq: number) => {
    const onClickAddCart = () => {
      // 장바구니에 하나만 담고 바로 결제로 이동
      const cartItem = {
        [item.id]: 1,
      };

      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      location.href = "/pay?prodId=" + item.id;
    };
    return (
      <div
        className="bg-white rounded-lg shadow-lg w-64 overflow-hidden"
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
          <p className="text-md font-bold mt-2">₩{item.price}</p>
          <Button className="bg-blue-500 text-white" onClick={onClickAddCart}>
            결제하기
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container p-6">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {productList.map((item, idx) => renderProductCard(item, idx))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
