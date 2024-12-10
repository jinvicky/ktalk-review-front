import RenewalReviewListWithInfiniteScroll from "@/app/review-renewal/components/RenewalReviewListWithInfiniteScroll";
import RenewalReviewForm from "./components/RenewalReviewForm";

const RenewalReviewPage = () => {
  return (
    <div className="bg-red-300">
      <h1>Renewal Review Page</h1>
      <RenewalReviewForm />
      <RenewalReviewListWithInfiniteScroll />
    </div>
  );
};

export default RenewalReviewPage;