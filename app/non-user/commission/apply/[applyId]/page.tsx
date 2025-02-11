import { selectCommissionApplyById } from "@/api/commissionApplyApi";
import NonUserReviewModalButton from "./NonUserReviewModalButton";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


/**
 * 신청서, 결제 내역 상세
 */
const NonUserCommissionApplyDetailPage: React.FC<{ params: { applyId: string } }> = async ({ params }) => {
    const applyId = params.applyId;
    const data = await selectCommissionApplyById(applyId) as ApiResult<CommissionApply>; // 신청서, 결제요청내역, 결제 내역, 리뷰 내역까지 통으로 조회하는 API 필요

    const { title, content } = data.data;

    return <div className="p-5">
        <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center py-10">
            <h1 className="text-2xl font-bold">리뷰 내역</h1>
            <NonUserReviewModalButton
                applyId={applyId}
            />
            <button>
                <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
            </button>
        </div>
        <div className="flex items-center py-10">
            <h1 className="text-2xl font-bold">신청서 내역</h1>
            <button>
                <KeyboardArrowUpIcon style={{ fontSize: 50 }} />
            </button>
        </div>
        <div className="flex items-center py-10">
            <h1 className="text-2xl font-bold">결제요청서 내역</h1>
            <button>
                <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
            </button>
        </div>
        <div className="flex items-center py-10">
            <h1 className="text-2xl font-bold">결제 내역</h1>
            <button>
                <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
            </button>
        </div>


        {/* <div className="text-xl font-bold mt-5">
            {title}
        </div> */}
        <div className="mt-5">
            {content}
        </div>
    </div>
}

export default NonUserCommissionApplyDetailPage;