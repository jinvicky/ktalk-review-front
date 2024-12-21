"use client";

import { useState } from "react";

import Image from "next/image";

import CustomModal from "@/components/Modal";

interface Product {
  name: string;
  shortDescription: string;
  description?: string;
  thumbnail: string;
  images: string[];
  price: number;
}

const ProductList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [productIndex, setProductIndex] = useState<number>(0);

  const productList: Product[] = [
    {
      name: "포토카드 A",
      shortDescription: "괴수 8호 나루미 포토카드",
      description: "앞뒤가 다릅니다.",
      thumbnail: "/assets/image/product/P100_thumbnail1.jpg",
      images: [
        "/assets/image/product/P100_thumbnail1.jpg",
        "/assets/image/product/P100_thumbnail2.jpg",
      ],
      price: 1000,
    },
    {
      name: "포토카드 B",
      shortDescription: "괴수 8호 호시나 포토카드",
      description: "앞뒤가 다릅니다.",
      thumbnail: "/assets/image/product/P101_thumbnail1.jpg",
      images: [
        "/assets/image/product/P101_thumbnail1.jpg",
        "/assets/image/product/P101_thumbnail2.jpg",
      ],
      price: 1000,
    },
    {
      name: "포토카드 C",
      shortDescription: "괴수 8호 나루미 포토카드",
      description: "앞뒤가 다릅니다.",
      thumbnail: "/assets/image/product/P102_thumbnail1.jpg",
      images: [
        "/assets/image/product/P102_thumbnail1.jpg",
        "/assets/image/product/P102_thumbnail2.jpg",
      ],
      price: 1000,
    },
    {
      name: "포토카드 D",
      shortDescription: "괴수 8호 호시나 포토카드",
      description: "앞뒤가 다릅니다.",
      thumbnail: "/assets/image/product/P103_thumbnail1.jpg",
      images: [
        "/assets/image/product/P103_thumbnail1.jpg",
        "/assets/image/product/P103_thumbnail2.jpg",
      ],
      price: 1000,
    },
  ];

  const renderProductCard = (item: Product, seq: number) => {
    return (
      <div
        className="bg-white rounded-lg shadow-lg w-64 overflow-hidden"
        key={seq} // key를 div에 직접 설정
        onClick={() => {
          setProductIndex(seq);
          setOpen(!open);
        }}
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
          <p className="text-gray-600 mt-2">{item.description}</p>
          <p className="text-md font-bold mt-2">₩{item.price}</p>
          <button className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm">
            구매하기
          </button>
        </div>
      </div>
    );
  };

  const renderProductDetail = (product: Product) => {
    return (
      <>
        <div className="flex justify-center align-center gap-2">
          {product.images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full">
              <Image
                src={img}
                alt="상품 이미지"
                className="bg-gray-100"
                width={685}
                height={1023}
              />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container p-6 bg-orange-300">
        <h1 className="text-2xl font-bold mb-6">상품 리스트</h1>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {productList.map((item, idx) => renderProductCard(item, idx))}
        </div>
      </div>
      {productList[productIndex] && (
        <CustomModal
          open={open}
          setOpen={() => setOpen(!open)}
          hideButton={true}
        >
          <>{renderProductDetail(productList[productIndex])}</>
        </CustomModal>
      )}
    </>
  );
};

export default ProductList;
