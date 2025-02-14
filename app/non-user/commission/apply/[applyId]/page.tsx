import NonUserReviewModalButton from "./NonUserReviewModalButton";

// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * 신청서, 결제 내역 상세
 */
const NonUserCommissionApplyDetailPage: React.FC<{ params: { applyId: string } }> = async ({ params }) => {
    const applyId = params.applyId;
    const data = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply/contract/${applyId}`).then(async (res) => await res.json());

    const { applyVO, payRequestVO, paymentVO, reviewVO } = data.data;

    return <div className="p-5">
        <div className="">
            {/* <h1 className="text-2xl font-bold">{title}</h1> */}
            <div className="py-3 text-gray-500 font-bold">
                * 비회원 신청서는 보안을 위해 작업이 완료된 후 삭제됩니다.
            </div>
        </div>
        <div>
            <div className="flex items-center py-5">
                <h1 className="text-2xl font-bold">리뷰 내역</h1>
                <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
            </div>
            <NonUserReviewModalButton
                applyId={applyId}
            />
            {
                reviewVO ? <div>
                    {reviewVO.content}
                </div>
                    : <div className="py-5">아직 작성된 리뷰가 없습니다.</div>
            }
        </div>
        <div className="flex items-center py-10">
            <h1 className="text-2xl font-bold">신청서 내역</h1>
        </div>
        <div>
            <div className="flex items-center py-5">
                <h1 className="text-2xl font-bold">결제요청서 내역</h1>
                <button>
                    <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                {payRequestVO ? <>
                    <div>결제 요청 금액: {payRequestVO.price}</div>

                    <div>
                        협의사항: {payRequestVO.discussion}
                    </div>
                    <div>
                        결제여부: {payRequestVO.payYn === "Y" ? "결제완료" : "미결제"}
                    </div>
                    <div>
                        결제요청날짜: {payRequestVO.rgtrDtFomatted}
                    </div>
                </> : <div className="py-5">결제 요청서가 없습니다.</div>
                }
            </div>
        </div>

        <div>
            <div className="flex items-center py-5">
                <h1 className="text-2xl font-bold">결제 내역</h1>
                <button>
                    <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                {paymentVO ? <>
                    <div>결제 요청 금액: {paymentVO.price}</div>
                    <div>
                        결제자명: {paymentVO.userName}
                    </div>
                    <div>
                        결제날짜: {payRequestVO.payDtFomatted}
                    </div>
                </> : <div className="py-5">결제 정보가 없습니다.</div>
                }
            </div>
        </div>
    </div >
}

export default NonUserCommissionApplyDetailPage;