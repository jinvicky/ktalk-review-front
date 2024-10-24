import ReviewListClient from "@/components/review/ReviewListClient";

const ReviewPage = () => {
  return (
    <>
      <div className="bg-rose-50 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-center font-bold text-2xl mb-4 p-5">
          걍진커미션의 후기입니다
        </h1>
        <ul className="list-disc list-inside">
          <li className="mb-2">
            위 게시판은 개발자로서 경험을 쌓기 위해 작가에 의해 제작되었습니다.
          </li>
          <li className="mb-2">
            신청자분들의 신청이미지 등의 민감 정보를 일절 저장하지 않습니다.
          </li>
          <li>작성해주신 후기는 작가에게 큰 힘이 됩니다. 감사합니다.</li>
        </ul>
        <ReviewListClient />
      </div>
    </>
  );
};

export default ReviewPage;
