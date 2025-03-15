"use server";

import ReviewArea from "./components/client/ReviewArea";
import ApplyArea from "./components/server/ApplyArea";
import PayRequestArea from "./components/client/PayRequestArea";
import { selectOneApplyById } from "@/api/applyApi";

/**
 * 신청서, 결제 내역 상세
 */
const NonUserCommissionApplyDetailPage: React.FC<{ params: { applyId: string } }> = async ({ params }) => {
    const applyId = params.applyId;
    const {status, message, data} = await selectOneApplyById(applyId);

    console.log(status, message, data);

    if(status !== 200) {
        return <div>요청에 실패했습니다. 인터넷 연결을 확인하거나 작가에게 문의해주세요</div>
    }

    if (!data) {
        return <div>신청서가 존재하지 않거나 삭제되었습니다.</div>
    }

    return <div className="p-5">
        <div className="">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <div className="py-3 text-gray-500 font-bold">
                * 비회원 신청서는 보안을 위해 작업이 완료된 후 2일 내로 삭제됩니다.
            </div>
        </div>
        <div>
            {/* <ReviewArea
                // data={reviewVO}
                applyId={applyId}
            /> */}
        </div>
        <ApplyArea applyVO={data} applyId={applyId} />
        {/* <PayRequestArea applyId={applyId}/> */}
    </div >
}

export default NonUserCommissionApplyDetailPage;