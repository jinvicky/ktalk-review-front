"use client";
import React, { useState } from "react";

import CartList from "@/components/cart/CartList";
import PaymentForm from "@/components/payment/PaymentForm";

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <>
      <div className="flex justify-center gap-5 min-h-screen">
        <CartList updateTotalPrice={setTotalPrice} />
        <PaymentForm totalPrice={totalPrice} />
      </div>
    </>
  );
};

export default CartPage;
