import { twMerge } from "tailwind-merge";

interface QuanntityControlProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityControl = ({ quantity, setQuantity }: QuanntityControlProps) => {
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={decreaseQuantity}
        className={twMerge(
          "w-10 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600",
          quantity <= 1 && "cursor-not-allowed bg-gray-500 hover:bg-gray-600"
        )}
      >
        -
      </button>
      <span className="text-lg font-semibold">{quantity}</span>{" "}
      <button
        onClick={increaseQuantity}
        className="w-10 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
