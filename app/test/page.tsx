"use client";

import { ChangeEvent, useState } from "react";

import fileDownload from 'js-file-download';
import BankTransferPayForm from "@/components/payment/BankTransferPayForm";
import PaymentRequestForm from "@/components/payment/PaymentRequestForm";

const Test = () => {

  const [fileList, setFileList] = useState<File[] | null>(null);

  const downloadFile = (fileUrl: string) => {
    fetch(fileUrl).then(async (resp) => {
      const blob = await resp.blob();
      fileDownload(blob, 'commission');
    });
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const selectedFiles = (e.target as HTMLInputElement).files;
    if (!selectedFiles) return;
    setFileList(Array.from(selectedFiles));
  };


  return (
    <>
      {/* <button
        onClick={() => downloadFile("http://res.cloudinary.com/dkfwo8t0v/raw/upload/v1740328013/test/1740328011698.xlsx")}>
        클릭시 raw 다운로드
      </button> */}

      <BankTransferPayForm />

      <PaymentRequestForm />
    </>
  );
};

export default Test;
