// "use client";

// import { useEffect, useState } from "react";

// import Image from "next/image";

// import CustomModal from "@/components/Modal";
// import AddCartBox from "@/components/product/AddCartBox";

// import { Product } from "@/types/product.type";

// const ProductList = () => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [productIndex, setProductIndex] = useState<number>(0);
//   const [productList, setProductList] = useState<Product[]>([]);

//   useEffect(() => {
//     fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/product/all").then(
//       async (res) => {
//         const data = (await res.json()) as ApiResult<Product[]>;
//         setProductList(data.data);
//       }
//     );
//   }, []);

//   const renderProductCard = (item: Product, seq: number) => {
//     return (
//       <div
//         className="bg-white rounded-lg shadow-lg w-64 overflow-hidden"
//         key={seq}
//       >
//         <div
//           className="relative w-full h-full"
//           onClick={() => {
//             setProductIndex(seq);
//             setOpen(!open);
//           }}
//         >
//           <Image
//             src={item.thumbnail}
//             alt="상품 이미지"
//             className="bg-gray-100"
//             width={685}
//             height={1023}
//           />
//         </div>
//         <div className="p-4">
//           <h2 className="text-lg font-semibold">{item.name}</h2>
//           <p className="text-gray-600 mt-2">{item.shortDescription}</p>
//           <p className="text-md font-bold mt-2">₩{item.price}</p>
//           <AddCartBox productId={item.id} />
//         </div>
//       </div>
//     );
//   };

//   const renderProductDetail = (product: Product) => {
//     return (
//       <>
//         <div className="flex justify-center align-center gap-2">
//           {product.images.map((img, idx) => (
//             <div key={idx} className="relative w-full h-full">
//               <Image
//                 src={img}
//                 alt="상품 이미지"
//                 className="bg-gray-100"
//                 width={685}
//                 height={1023}
//               />
//             </div>
//           ))}
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold">{product.name}</h2>
//           <p className="text-gray-600 mt-2">{product.description}</p>
//         </div>
//       </>
//     );
//   };

//   return (
//     <>
//       <div className="container p-6 bg-orange-300">
//         <div className="flex items-center justify-center gap-6 flex-wrap">
//           {productList.map((item, idx) => renderProductCard(item, idx))}
//         </div>
//       </div>
//       {productList[productIndex] && (
//         <CustomModal
//           open={open}
//           setOpen={() => setOpen(!open)}
//           hideButton={true}
//         >
//           <>{renderProductDetail(productList[productIndex])}</>
//         </CustomModal>
//       )}
//     </>
//   );
// };

// export default ProductList;
