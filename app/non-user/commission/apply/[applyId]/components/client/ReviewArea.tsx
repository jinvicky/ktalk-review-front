"use client";

import { Review } from "@/types/review.type";

import NonUserReviewModalButton from "../../NonUserReviewModalButton";

interface ReviewAreaProps {
    data: Review | null;
    applyId: string | null;
}

const ReviewArea = ({ data, applyId }: ReviewAreaProps) => {
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
                        {applyId && <NonUserReviewModalButton applyId={applyId} />}
                    </div>
            }
        </div>
    </>;
};

export default ReviewArea;