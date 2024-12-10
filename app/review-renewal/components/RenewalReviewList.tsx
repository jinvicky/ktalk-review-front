"use client";

import { useEffect, useMemo, useState } from "react";

import { ApiResult, CustPage } from "@/types/api.type";
import { Review } from "@/types/review.type";

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
    let reviews: ApiResult<CustPage<Review>> = await data.json();
    setReviewList([...reviewList, ...reviews.data.list]);
  };

  useEffect(() => {
    updateData();
  }, [page]);

  /**
   * 모든 데이터를 가져왔는지 여부
   */
  const fetchedAllData = useMemo(() => {
    return reviewList.length >= size * (page + 1);
  }, [reviewList, size, page])

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
      <div>
        <div>
          <h1>Renewal Review List</h1>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full">
          {render()}
        </ul>
        {fetchedAllData && (
          <button onClick={() => setPage(page + 1)}>더보기</button>
        )}
      </div>
    </>
  );
};

export default RenewalReviewList;
