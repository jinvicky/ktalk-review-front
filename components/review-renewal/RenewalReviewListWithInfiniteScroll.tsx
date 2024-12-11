"use client";

import { useEffect, useMemo, useState } from "react";
import { TailMasking } from "@/utils/masking.util";
import { useInView } from "react-intersection-observer";

import { Review } from "@/types/review.type";
import CustomModal from "@/components/Modal";

import "@/styles/review-renewal/reviewList.scss";

const RenewalReviewListWithInfiniteScroll = () => {
  const viewLimitCount = 5; // size, 최대 출력 개수
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(5);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [ref, inView] = useInView();
  const [reviewIdx, setReviewIdx] = useState<number>(0);

  const updateData = async () => {
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
      setPage(page + 1);
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
        className="min-w-20 p-4 mb-4 rounded-lg shadow-sm bg-white flex flex-col justify-between"
        onClick={() => {
          setModalOpen(true);
          setReviewIdx(index);
        }}
      >
        <div className="text-lg font-semibold mb-2 review-text-ellipsis">
          {review.content}
          </div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-600">
            {TailMasking.shortMasking(review.username, 3)}
          </span>
          <span className="text-sm text-gray-400">{review.createdAt}</span>
        </div>
      </li>
    ));
  };

  const [modalOpen, setModalOpen] = useState(false);

  const modalDetail = (review: Review) => { 
    return (
      <div>
        <div className="text-lg font-semibold mb-2">{review.content}</div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-600">
            {TailMasking.shortMasking(review.username, 3)}
          </span>
          <span className="text-sm text-gray-400">{review.createdAt}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full">
          {render()}
        </ul>
        <CustomModal open={modalOpen} setOpen={() => setModalOpen(!modalOpen)}>
          <>{reviewList[reviewIdx] && modalDetail(reviewList[reviewIdx])}</>
        </CustomModal>
        <div ref={ref} className="bg-orange-600 h-20">
          This is Spinner!!!
        </div>
      </div>
    </>
  );
};

export default RenewalReviewListWithInfiniteScroll;
