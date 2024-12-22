"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Product } from "@/types/product.type";

import QuantityControl from "@/components/QuantityControl";
import { addCommaKRW } from "@/utils/number.util";

interface CartListProps {
  updateTotalPrice: (totalPrice: number) => void;
}

const CartList = ({ updateTotalPrice }: CartListProps) => {
  const [remoteCartItems, setRemoteCartItems] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const fetchRemoteCartItems = async () => {
    const storedCartItems = localStorage.getItem("cartItem");
    setQuantities(JSON.parse(storedCartItems || "{}"));
    if (storedCartItems) {
      fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/product/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: storedCartItems,
      }).then(async (resp) => {
        const data = (await resp.json()) as ApiResult<Product[]>;
        setRemoteCartItems(data.data);
      });
    }
  };

  useEffect(() => {
    fetchRemoteCartItems();
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    remoteCartItems.forEach((product) => {
      const quantity = quantities[product.id];
      totalPrice += quantity * product.price;
    });

    updateTotalPrice(totalPrice);
  }, [remoteCartItems, quantities, updateTotalPrice]);

  const fetchLocalStorageCartItems = () => {
    return JSON.parse(localStorage.getItem("cartItem") || "{}");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = {
      ...fetchLocalStorageCartItems(),
      [productId]: quantity,
    };
    localStorage.setItem("cartItem", JSON.stringify(updatedCart));
    setQuantities(updatedCart);
  };

  const handleRemove = (productId: string) => {
    const updatedCart = { ...fetchLocalStorageCartItems() };
    delete updatedCart[productId];
    localStorage.setItem("cartItem", JSON.stringify(updatedCart));
    fetchRemoteCartItems();
    alert("상품이 장바구니에서 삭제되었습니다.");
  };

  return (
    <div className="w-1/2 min-h-52 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">장바구니</h2>
      {remoteCartItems.length === 0 ? (
        <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
      ) : (
        <ul className="space-y-4">
          {remoteCartItems.map((product: Product) => (
            <li
              key={product.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
            >
              <div>
                <span className="font-semibold">제품명: {product.name}</span>
                <div className="text-gray-500">{product.shortDescription}</div>
                <Image
                  src={product.thumbnail}
                  alt="상품 이미지"
                  width={100}
                  height={100}
                />
              </div>
              <span className="text-lg">
                가격:{" "}
                {addCommaKRW(quantities[product.id] * product.price, true)}
              </span>
              <div className="flex space-x-2">
                <QuantityControl
                  quantity={quantities[product.id]}
                  setQuantity={(quantity) =>
                    updateQuantity(product.id, quantity)
                  }
                />
                <button
                  onClick={() => handleRemove(product.id)}
                  className="px-2 py-1 text-gray-500 border border-gray-500 bg-white rounded hover:bg-gray-200"
                >
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CartList;
