import { selectCommissionReviewList } from '@/api/commissionReviewApi';

import { CommissionReview } from '@/types/commission/CommissionReviewType';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const CommissionReviewList = async () => {
    const data = await selectCommissionReviewList() as ApiResult<CommissionReview[]>;

    return <>
        <div>
            <h1 className="font-bold text-2xl p-3">리뷰</h1>
            <div className="w-full h-[2px] bg-gray-700"></div>
            <div className="w-full flex">
                {
                    data.data.length == 0
                        ? <div className="w-full py-5 text-center">아직 등록된 리뷰가 없습니다</div>
                        : <ul className="w-full">
                            {
                                data.data.map((review: CommissionReview, index: number) => <li
                                    className="border-b border-gray-300 p-3"
                                    key={index}
                                >
                                    <div>
                                        <span className="font-bold text-lg">
                                            {review.title ?? '제목 없음'}
                                        </span>
                                        <span className="ml-5 text-gray-500">{review.rgtrDt}</span>
                                        <p className="py-3">{review.content}
                                        </p>
                                    </div>
                                </li>
                                )
                            }
                            <button className="w-full p-3 text-center">
                                <KeyboardDoubleArrowDownIcon />
                            </button>
                        </ul>
                }
            </div>
        </div></>
}

export default CommissionReviewList;