"use client";

import { useState } from "react";

const Test = () => {

  const[fileList, setFileList] = useState<FileList | null>(null); 

  const onClick = async () => {
    const formData = new FormData();
    if(!fileList) return;

    for (let i = 0; i < fileList.length; i++) {
      formData.append("files", fileList[i]);
    }
    const resp = await fetch("/api/commission/apply/test", {
      method: "POST",
      body: formData,
    })

    console.log(resp);
  }

  return (
    <>

      <input type="file" multiple onChange={(e)=> setFileList(e.target.files)}/>

      <button onClick={onClick}>
        클릭시 업로드 요청
      </button>

    </>
  );
};

export default Test;
