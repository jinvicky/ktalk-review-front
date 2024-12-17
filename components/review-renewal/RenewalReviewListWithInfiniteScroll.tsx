"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Review } from "@/types/review.type";

import CustomModal from "@/components/Modal";
import LoadingIcon from "@/components/review-renewal/LoadingIcon";

import { TailMasking } from "@/utils/masking.util";

import "@/styles/review-renewal/reviewList.scss";

const RenewalReviewListWithInfiniteScroll = () => {
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(5);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [ref, inView] = useInView();
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewIdx, setReviewIdx] = useState<number>(0);

  const updateData = async () => {
    if (reviewList.length >= totalCount) return;
    const limitByDevice = window.innerWidth < 768 ? 5 : 12;
    const data = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN_URL +
        "/api/renewal/review/all" +
        "?page=" +
        page +
        "&size=" +
        limitByDevice
    );
    const reviews: ApiResult<CustPage<Review>> = await data.json();

    if (reviews.data.list.length > 0) {
      setReviewList((prev: Review[]) => [...prev, ...reviews.data.list]);

      // 함수형 업데이트로 최신 상태 관리
      setPage((prevPage) => prevPage + 1);
      setTotalCount(reviews.data.pageInfo.totalCount);
    }
  };

  const fetchedAllData = useMemo(() => {
    return reviewList.length >= totalCount;
  }, [reviewList.length, totalCount]);

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    if (inView && reviewList.length > 0) {
      updateData();
    }
  }, [inView, reviewList.length]);

  const render = () => {
    return reviewList.map((review: Review, index: number) => (
      <li
        key={`review-${index}`}
        className="min-w-20 p-4 mb-4 rounded-lg shadow-md bg-white flex flex-col justify-between"
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
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        totalCount : <span>{totalCount} </span>
      </div>
      <ul className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">{render()}</ul>
      <CustomModal open={modalOpen} setOpen={() => setModalOpen(!modalOpen)}>
        <>{reviewList[reviewIdx] && modalDetail(reviewList[reviewIdx])}</>
      </CustomModal>
      {!fetchedAllData && <LoadingIcon loadingRef={ref} />}
    </div>
  );
};

export default RenewalReviewListWithInfiniteScroll;
