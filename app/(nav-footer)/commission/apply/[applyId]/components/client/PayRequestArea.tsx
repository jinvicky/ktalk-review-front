import BankTransferPayForm from "@/components/payment/BankTransferPayForm";
import MemberPointUseForm from "./MemberPointUseForm";
import PayRequestResult from "./PayRequestResult";

interface PayRequestProps {
    applyId: string;
}

const PayRequestArea = async ({ applyId }: PayRequestProps) => {

    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/pay-request/apply-id/${applyId}`);
    const {data, message, status} = await resp.json();

    return <>
        <div>
            <a className="flex items-center py-5" href="#pay-request-section">
                <h1 className="text-2xl font-bold">결제요청서</h1>
            </a>
            <div id="pay-request-section" className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                <PayRequestResult data={data}/>
                {/* <MemberPointUseForm />
                <div className="flex items-center space-x-2 text-lg font-semibold">
                    <span className="text-gray-600">결제하기</span>
                </div>
                <div className="p-3">
                    <BankTransferPayForm />
                </div> */}
            </div>
            <a className="flex items-center py-5" href="#payment-section">
                <h1 className="text-2xl font-bold">결제하기</h1>
            </a>
            <div id="payment-section" className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
            </div>
        </div>
    </>
};

export default PayRequestArea;