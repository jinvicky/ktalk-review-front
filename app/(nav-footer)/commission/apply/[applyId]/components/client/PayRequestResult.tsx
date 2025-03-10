import { CmsPayRequest } from "@/types/commission/cmsPayRequestType";
import { addCommaKRW } from "@/utils/number.util";


const PayRequestResult = ({ data }: { data: CmsPayRequest }) => {
    return <>
        <div>
            <div className="text-lg font-semibold text-gray-600">결제 요청 금액</div>
            <div className="pt-3 text-gray-800">{data.price && addCommaKRW(data.price, true)}</div>
        </div>
        <div>
            <div className="text-lg font-semibold text-gray-600">협의사항</div>
            <div className="pt-3 text-gray-800">{data.discussion}</div>
        </div>
    </>
};

export default PayRequestResult;