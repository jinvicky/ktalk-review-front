import { Review } from "@/types/review.type";
import { formatDateArray } from "@/utils/date.util";

const ReviewListClient = async () => {
  const reviews = await fetch(process.env.DOMAIN_URL + "/review/all").then(
    (response) => response.json()
  );

  const render = () => {
    return reviews.map((review: Review, index: number) => (
      <li
        key={`review-${index}`}
        className="min-w-20 p-7 mb-4 rounded-lg shadow-sm bg-white"
      >
        <div className="text-lg font-semi-bold mb-2">{review.content}</div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-600">익명</span>
          <span className="text-sm text-gray-400">
            {formatDateArray(review.createdAt)}
          </span>
        </div>
      </li>
    ));
  };
  return <ul className="grid grid-cols-4 gap-4 p-6 w-full">{render()}</ul>;
};

export default ReviewListClient;
