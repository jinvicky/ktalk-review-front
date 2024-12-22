"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import PaymentForm from "@/components/payment/PaymentForm";
import { Product } from "@/types/product.type";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItem");
    if (storedCartItems) {
      fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/product/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: storedCartItems,
      }).then(async (resp) => {
        const data = (await resp.json()) as ApiResult<Product[]>;
        setCartItems(data.data);
      });
    }
  }, []);

  // const handleIncrease = (productId: string) => {
  //   const newQuantity = (cartItems[productId] || 0) + 1;
  //   updateQuantity(productId, newQuantity);
  // };

  // const handleDecrease = (productId: string) => {
  //   const newQuantity = (cartItems[productId] || 0) - 1;
  //   updateQuantity(productId, newQuantity);
  // };

  // const handleRemove = (productId: string) => {
  //   const updatedCart = { ...cartItems };
  //   delete updatedCart[productId];
  //   setCartItems(updatedCart);
  //   localStorage.setItem("cartItem", JSON.stringify(updatedCart));
  // };

  return (
    <div className="flex justify-center items-center gap-5 h-screen">
      <div className="w-1/2 min-h-52 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">장바구니</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((product: Product) => (
              <li
                key={product.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
              >
                <div>
                  <span className="font-semibold">제품명: {product.name}</span>
                  <div className="text-gray-500">
                    {product.shortDescription}
                  </div>
                  <Image
                    src={product.thumbnail}
                    alt="상품 이미지"
                    width={100}
                    height={100}
                  />
                </div>
                <span className="text-lg">수량: {product.cartQuantity}</span>
                <div className="flex space-x-2">
                  <button
                    // onClick={() => handleDecrease(productId)}
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <button
                    // onClick={() => handleIncrease(productId)}
                    className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    +
                  </button>
                  <button
                    // onClick={() => handleRemove(productId)}
                    className="px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600"
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <PaymentForm />
    </div>
  );
};

export default CartPage;
