"use client";
import PaymentRequestForm from "@/components/payment/PaymentRequestForm";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/navigation";

const Test = () => {
  const referer = "http://localhost:3000/promotion"

  return (
    <>
      

      <PaymentRequestForm />
    </>
  );
};

export default Test;
