"use client";
import { Review } from "@/types/review.type";
import { useEffect, useState } from "react";

const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/review/all").then(
      (response) => {
        response.json().then((data) => {
          setReviews(data);
        });
      }
    );
  }, []);

  const render = () => {
    return reviews.map((review: Review, index: number) => (
      <li
        key={`review-${index}`}
        className="min-w-20 p-4 mb-4 rounded-lg shadow-sm bg-white"
      >
        <div className="text-lg font-semibold mb-2">{review.content}</div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-600">익명</span>
          <span className="text-sm text-gray-400">{review.createdAt}</span>
        </div>
      </li>
    ));
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full">
      {render()}
    </ul>
  );
};

export default ReviewList;
