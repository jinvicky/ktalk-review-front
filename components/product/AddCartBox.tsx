// "use client";

// import { useState } from "react";
// import QuantityControl from "../QuantityControl";

// interface AddCartBoxProps {
//   productId: string;
// }

// const AddCartBox = ({ productId }: AddCartBoxProps) => {
//   const [quantity, setQuantity] = useState<number>(1);

//   const onAddCart = (quantity: number) => {
//     const cartItem = localStorage.getItem("cartItem");

//     if (cartItem === null) {
//       localStorage.setItem(
//         "cartItem",
//         JSON.stringify({ [productId]: quantity })
//       );
//     } else {
//       const toParse = JSON.parse(cartItem);
//       toParse[productId] = quantity;

//       localStorage.setItem("cartItem", JSON.stringify(toParse));
//     }
//   };
//   return (
//     <>
//       <div className="flex align-center justify-between mt-4">
//         <button
//           className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm"
//           onClick={() => {
//             onAddCart(quantity);
//             alert("장바구니에 담겼습니다.");
//           }}
//         >
//           장바구니 담기
//         </button>
//         <QuantityControl
//           quantity={quantity}
//           setQuantity={(quantity: number) => setQuantity(quantity)}
//         />
//       </div>
//     </>
//   );
// };

// export default AddCartBox;
