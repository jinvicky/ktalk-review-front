"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Review } from "@/types/review.type";

const RenewalReviewListWithInfiniteScroll = () => {
  const viewLimitCount = 5; // size, 최대 출력 개수
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(5);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [ref, inView] = useInView();

  const updateData = async () => {
    console.log("updateData");
    let data = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN_URL +
        "/api/renewal/review/all" +
        "?page=" +
        page +
        "&size=" +
        viewLimitCount
    );
    const reviews: ApiResult<CustPage<Review>> = await data.json();

    if (reviews.data.list.length) {
      setPage(page+1); // 요청 후에 페이지 수를 증가시킨다.
      setTotalCount(reviews.data.pageInfo.totalCount);
      setReviewList((prev: Review[]) => {
        return [...prev, ...reviews.data.list];
      });
    }
  };

  /**
   * 모든 데이터를 가져왔는지 여부 체크
   */
  const fetchedAllData = useMemo(() => {
    // return reviewList.length >= viewLimitCount * (page + 1);
    return reviewList.length >= totalCount;
  }, [reviewList, viewLimitCount, page]); 

  useEffect(() => {
    if (inView) {
      if (fetchedAllData) {
        return;
      }
      updateData();
    }
  }, [inView]);

  const render = () => {
    return reviewList.map((review: Review, index: number) => (
      <li
        key={`review-${index}`}
        className="min-w-20 p-4 mb-4 rounded-lg shadow-sm bg-white"
      >
        <div className="text-lg font-semibold mb-2">{review.content}</div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-600">{review.username}</span>
          <span className="text-sm text-gray-400">{review.createdAt}</span>
        </div>
      </li>
    ));
  };

  return (
    <>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full">
          {render()}
        </ul>
        <div ref={ref} className="bg-orange-600 h-20">
          This is Spinner!!!
        </div>
      </div>
    </>
  );
};

export default RenewalReviewListWithInfiniteScroll;
