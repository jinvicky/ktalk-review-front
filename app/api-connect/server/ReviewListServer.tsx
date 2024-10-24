import { Review } from "../types/review.type";
import { dateFormat } from "../util/date.util";

const ReviewListServer = async () => {
  const response = await fetch(`${process.env.DOMAIN_URL}/review/all`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return <>요청 도중 오류가 발생했습니다</>;
  }

  const reviews = await response.json();

  const reviewRender = () => {
    if (reviews.length === 0) {
      return <div>리뷰가 없습니다.</div>;
    }
    return reviews.map((review: Review, index: number) => (
      <li
        key={`review-${index}`}
        className="p-4 mb-4 rounded-lg shadow-sm bg-white"
      >
        <div className="text-lg font-semi-bold mb-2">{review.content}</div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-600">{"익명"}</span>
          {/* <span className="text-sm text-gray-400">{dateFormat.format(new Date(review.createdAt))}</span> */}
        </div>
      </li>
    ));
  };

  return (
    <div className="w-full min-h-full">
      <ul className="grid grid-cols-4 gap-4 p-5">{reviewRender()}</ul>
    </div>
  );
};

export default ReviewListServer;
