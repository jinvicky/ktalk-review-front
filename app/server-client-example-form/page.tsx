import ReviewList from "@/app/server-client-example-form/server/ReviewList";
import ReviewForm from "@/app/server-client-example-form/client/ReviewFormClient";

const UseFormStatePage = async () => {
  return (
    <>
      <h1>prisma에 신규 리뷰를 작성했을 때 ReviewList는 실시간 반영이 되는가? 됩니다~</h1>
      <ReviewForm />
      <ReviewList />
    </>
  );
};

export default UseFormStatePage;
