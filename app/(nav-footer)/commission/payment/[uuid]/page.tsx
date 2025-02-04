import { selectPaymentRequestById } from "@/api/commissionPaymentApi";

import { CommissionPaymentRequest } from "@/types/paymentType";

import PaymentRequestForm from "@/components/payment/PaymentRequestForm";

const CommissionPaymentPage = async ({ params }: { params: { uuid: string } }) => {
    const id = params.uuid;
    const resp = await selectPaymentRequestById(id) as ApiResult<CommissionPaymentRequest>;

    const { data, status } = resp;
    console.log(resp);

    if (status !== "200") {
        return <>결제 요청서 조회 중 오류가 발생했습니다</>;
    }

    if (!data) {
        return <>해당 결제 요청서가 존재하지 않습니다</>;
    }

    return (
        <>
            <PaymentRequestForm data={data}/>
        </>
    )
}

export default CommissionPaymentPage;