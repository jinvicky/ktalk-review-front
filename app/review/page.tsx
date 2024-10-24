import ReviewForm from "@/components/review/ReviewForm";
import ReviewList from "@/components/review/ReviewList";

const ReviewPage = () => {
  return (
    <>
      <div className="bg-rose-50 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-center font-bold text-2xl px-5 pt-5 pb-0">
          걍진커미션의 후기입니다
        </h1>
        <ul className="list-disc list-inside my-5 p-4 list-none">
          <li className="mb-2 text-gray-800">
            위 게시판은 개발자로서 경험을 쌓기 위해 작가에 의해 제작되었습니다.
          </li>
          <li className="mb-2 text-gray-800">
            신청자분들의 신청이미지 등의 민감 정보를 일절 저장하지 않습니다.
          </li>
        </ul>
        <ReviewForm />
        <ReviewList />
      </div>
    </>
  );
};

export default ReviewPage;
