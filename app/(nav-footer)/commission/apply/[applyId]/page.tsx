"use server";

import ReviewArea from "./components/client/ReviewArea";
import ApplyArea from "./components/server/ApplyArea";
import PayRequestArea from "./components/client/PayRequestArea";
import { selectOneApplyById } from "@/api/applyApi";
import FetchErrorScreen from "@/components/error/FetchErrorScreen";
import DataNotFoundScreen from "@/components/error/DataNotFoundScreen";

/**
 * 커미션 신청 상세
 */
const NonUserCommissionApplyDetailPage: React.FC<{ params: { applyId: string } }> = async ({ params }) => {
    const applyId = params.applyId;
    const { status, message, data } = await selectOneApplyById(applyId);
    const applyData = data as CommissionApply;

    if (status !== 200) return <FetchErrorScreen />;
    if (!applyData) return <DataNotFoundScreen />;

    return <div className="p-5">
        <div>
            <h1 className="text-2xl font-bold">{applyData.title}</h1>
        </div>
        <ReviewArea applyId={applyData.id} />
        <ApplyArea applyVO={applyData} />
        {/* <PayRequestArea applyId={applyId}/> */}
    </div >
}

export default NonUserCommissionApplyDetailPage;