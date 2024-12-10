"use client";

import { ApiResult } from "@/types/api.type";
import { Review } from "@/types/review.type";
import { useEffect, useState } from "react";

const RenewalReviewList = () => {
  const size = 5;
  const [page, setPage] = useState(0);
  const [reviewList, setReviewList] = useState<Review[]>([]);

  const updateData = async () => {
    let data = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN_URL +
        "/api/renewal/review/all" +
        "?page=" +
        page +
        "&size=" +
        size
    );
    let reviews: ApiResult<Review[]> = await data.json();
    setReviewList([...reviewList, ...reviews.data]);
  };

  useEffect(() => {
    updateData();
  }, [page]);

  const render = () => {
    return reviewList.map((review: Review, index: number) => (
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
    <>
      <div className="renewal-review-list">
        <div className="renewal-review-list__header">
          <h1>Renewal Review List</h1>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full">
          {render()}
        </ul>
        <button onClick={() => setPage(page + 1)}>더보기</button>
      </div>
    </>
  );
};

export default RenewalReviewList;
