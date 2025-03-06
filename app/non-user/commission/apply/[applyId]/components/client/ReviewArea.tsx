"use client";

import { useEffect, useState } from "react";

import { Review } from "@/types/review.type";

import ReviewWriteButton from "./ReviewWriteButton";

interface ReviewAreaProps {
    data?: Review | null;
    applyId: string | null;
}

const ReviewArea = ({ data, applyId }: ReviewAreaProps) => {
    const [apiCall, setApiCall] = useState<boolean>(false);
    const [review, setReview] = useState<Review | null>(null);

    /**
     * 상위로부터 신청 id만 전달받아서 병렬로 리뷰 단건 조회하고 보여주는 화면도 갱신하도록 한다.
     * 내부 review 상태로 처리한다. props - data 폐기예정
     * ㅊㅅㅇ님 리뷰 받기 전까지 고칠 것.
     */
    useEffect(() => {
        // JVK:: TODO:: 리뷰 단건 조회??? 가능함? -> 신청 id로 매핑된 리뷰 가져오는 back-api 필요
        // const resp = fetch()

    }, [apiCall]);

    return <>
        <div className="flex items-center pt-5">
            <h1 className="text-2xl font-bold">리뷰</h1>
        </div>
        <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
            {
                data
                    ? <div>
                        <div>
                            {data.content}
                        </div>
                        <div className="mt-2">
                            {data.rgtrDtFormatted}
                        </div>
                    </div>
                    : <div>
                        <div className="py-5">아직 작성된 리뷰가 없습니다.</div>
                        {applyId && <ReviewWriteButton
                            applyId={applyId}
                            afterSubmit={() => setApiCall(!apiCall)}
                        />
                        }
                    </div>
            }
        </div>
    </>;
};

export default ReviewArea;