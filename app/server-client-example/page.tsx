"use client"; // 있으나 없으나 동일
import ReviewList from "./server/ReviewList";

const UseFormStatePage = async () => {
  return (
    <>
      <h1>
        서버 컴포넌트에서 클라이언트 컴포넌트에게 props로 내려주어 async-await
        이슈를 해결한다.
      </h1>

      <ReviewList />
    </>
  );
};

export default UseFormStatePage;
