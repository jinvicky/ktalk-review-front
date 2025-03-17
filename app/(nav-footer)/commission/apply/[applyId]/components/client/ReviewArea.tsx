"use client";

import { useEffect, useState } from "react";

import { Review } from "@/types/review.type";
import { ServerResponseCode } from "@/types/api.type";

import ReviewWriteButton from "./ReviewWriteButton";

import { selectReviewByApplyId } from "@/api/commissionReviewApi";

interface ReviewAreaProps {
    applyId: string;
}

const ReviewArea = ({ applyId }: ReviewAreaProps) => {
    const [review, setReview] = useState<Review | null>(null);

    // 리뷰 데이터 재호출 후 데이터 업데이트
    const refreshReviewData = async () => {
        const resp = await selectReviewByApplyId(applyId);
        if (resp.status === ServerResponseCode.Success) {
            setReview(resp.data);
        }
    }

    useEffect(() => {
        refreshReviewData();
    }, []);

    return <div>
        <div className="flex items-center pt-5">
            <h1 className="text-2xl font-bold">리뷰</h1>
        </div>
        <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
            {review
                ? <div>
                    <div>
                        {review.content}
                    </div>
                    <div className="mt-2">
                        {review.rgtrDtFormatted}
                    </div>
                </div>
                : <div>
                    <div className="py-5">아직 작성된 리뷰가 없습니다.</div>
                    <ReviewWriteButton
                        applyId={applyId}
                        afterSubmit={refreshReviewData}
                    />
                </div>
            }
        </div>
    </div>;
};

export default ReviewArea;