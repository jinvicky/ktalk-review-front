"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Test = () => {


  return (
    <>
      <p>카카오뱅크 xxxx-xx-xxxx-xxx</p>
      <CopyToClipboard
        text="카카오뱅크 xxxx-xx-xxxx-xxx"
        onCopy={() => alert("계좌번호가 복사되었습니다.")}
      >
        <button>계좌복사</button>
      </CopyToClipboard>
    </>
  );
};

export default Test;
