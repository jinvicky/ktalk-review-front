import PaymentForm from "./PaymentForm";
import PayRequestResult from "./PayRequestResult";

interface PayRequestProps {
    applyId: string;
}

const PayRequestArea = async ({ applyId }: PayRequestProps) => {

    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/pay-request/apply-id/${applyId}`);
    const {data} = await resp.json();

    return <>
        <div>
            <a className="flex items-center py-5" href="#pay-request-section">
                <h1 className="text-2xl font-bold">결제요청서</h1>
            </a>
            <div id="pay-request-section" className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                <PayRequestResult data={data}/>
            </div>
            <a className="flex items-center py-5" href="#payment-section">
                <h1 className="text-2xl font-bold">결제하기</h1>
            </a>
            <div id="payment-section" className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                <PaymentForm />
            </div>
        </div>
    </>
};

export default PayRequestArea;