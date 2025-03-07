import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PaymentRequestForm from "@/components/payment/PaymentRequestForm";
import ReviewArea from "./components/client/ReviewArea";
import ApplyArea from "./components/server/ApplyArea";
import PayRequestArea from "./components/client/PayRequestArea";

/**
 * 신청서, 결제 내역 상세
 */
const NonUserCommissionApplyDetailPage: React.FC<{ params: { applyId: string } }> = async ({ params }) => {
    const applyId = params.applyId;
    const data = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply/contract/${applyId}`, { cache: 'no-store' }).then(async (res) => await res.json());

    if (!data.data) {
        return <div>신청서가 존재하지 않거나 삭제되었습니다.</div>
    }

    const { applyVO, payRequestVO, paymentVO, reviewVO } = data.data;

    return <div className="p-5">
        <div className="">
            <h1 className="text-2xl font-bold">{applyVO.title}</h1>
            <div className="py-3 text-gray-500 font-bold">
                * 비회원 신청서는 보안을 위해 작업이 완료된 후 2일 내로 삭제됩니다.
            </div>
        </div>
        <div>
            <ReviewArea
                // data={reviewVO}
                applyId={applyId}
            />
        </div>
        <ApplyArea applyVO={applyVO} applyId={applyVO.id} />
        <PayRequestArea />
        <div>
            <div className="flex items-center py-5">
                <h1 className="text-2xl font-bold">결제 내역</h1>
                <button>
                    <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                {paymentVO ? <>
                    <div>결제 금액: {paymentVO.price}</div>
                    <div>
                        결제수단: {paymentVO.payType === "61" ? "계좌이체" : paymentVO.payType}
                    </div>
                    <div>
                        결제자명: {paymentVO.userName}
                    </div>
                    <div>
                        결제날짜: {paymentVO.payDtFomatted}
                    </div>
                </> : payRequestVO ? <PaymentRequestForm data={payRequestVO} /> : <div className="py-5">결제 요청서가 있어야 결제할 수 있습니다.</div>
                }
            </div>
        </div>
    </div >
}

export default NonUserCommissionApplyDetailPage;