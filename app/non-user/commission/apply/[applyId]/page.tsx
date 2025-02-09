import { selectCommissionApplyById } from "@/api/commissionApplyApi";
import NonUserReviewModalButton from "./NonUserReviewModalButton";


/**
 * 신청서, 결제 내역 상세
 */
const NonUserCommissionApplyDetailPage: React.FC<{ params: { applyId: string } }> = async ({ params }) => {
    const applyId = params.applyId;
    const data = await selectCommissionApplyById(applyId) as ApiResult<CommissionApply>;

    const { title, content } = data.data;

    return <div className="p-5">
        <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold">신청서, 결제 내역 상세</h1>
            <NonUserReviewModalButton 
                applyId={applyId}
            />
        </div>
        <div className="text-xl font-bold mt-5">
            {title}
        </div>
        <div className="mt-5">
            {content}
        </div>
    </div>
}

export default NonUserCommissionApplyDetailPage;