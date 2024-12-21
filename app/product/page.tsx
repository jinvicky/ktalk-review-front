import PaymentForm from "@/components/payment/PaymentForm";
import ProductList from "@/components/product/ProductList";

const ProductPage = () => {
  return (
    <>
      <div className="text-center font-bold">
        죄송합니다. 해외 주문을 지원하지 않습니다.
      </div>
      <div className="mx-auto flex justify-center">
        <ProductList />
        <PaymentForm />
      </div>
    </>
  );
};

export default ProductPage;
