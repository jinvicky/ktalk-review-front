import ReviewForm from "../review/ReviewForm";

interface PaymentFormProps {
  totalPrice: number;
}

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  return (
    <>
      <div className="bg-blue-300">
        {totalPrice}원 결제 예정입니다. 결제 폼입니다.
        <ReviewForm />
      </div>
    </>
  );
};

export default PaymentForm;
