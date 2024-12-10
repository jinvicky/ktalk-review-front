import RenewalReviewList from "@/app/review-renewal/components/RenewalReviewList";
import RenewalReviewForm from "./components/RenewalReviewForm";

const RenewalReviewPage = () => {
  return (
    <div className="bg-red-300">
      <h1>Renewal Review Page</h1>
      <RenewalReviewForm />
      <RenewalReviewList />
    </div>
  );
};

export default RenewalReviewPage;