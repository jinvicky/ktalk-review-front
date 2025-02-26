"use client";

import { ChangeEvent, useState } from "react";

import fileDownload from 'js-file-download';
import NonUserReviewModalButton from "../non-user/commission/apply/[applyId]/NonUserReviewModalButton";
import RequestLoading from "@/components/RequestLoading";


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

  const onClick = async () => {
    const formData = new FormData();
    if (!fileList) return;

    const size = fileList.reduce((acc, file) => acc + file.size, 0);
    console.log(size);


    for (let i = 0; i < fileList.length; i++) {
      formData.append("files", fileList[i]);
    }
    const resp = await fetch("/api/test/apply/test/sync", {
      method: "POST",
      body: formData,
    })

    console.log(resp);
  }

  return (
    <>

      <input type="file" multiple onChange={(e) => handleFileChange(e)} />

      <button onClick={onClick}>
        클릭시 업로드 요청
      </button>

      <button
        onClick={() => downloadFile("http://res.cloudinary.com/dkfwo8t0v/raw/upload/v1740328013/test/1740328011698.xlsx")}>
        클릭시 raw 다운로드
      </button>

      {/* <NonUserReviewModalButton applyId="" /> */}

      <RequestLoading message="" />
    </>
  );
};

export default Test;
