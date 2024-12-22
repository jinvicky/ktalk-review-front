"use client";
import { useState } from "react";

import AddressModal from "./AddressModal";

import { DaumAddress } from "@/types/address.type";

import { addCommaKRW } from "@/utils/number.util";

interface PaymentFormProps {
  totalPrice: number;
}

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const updateAddress = (data: DaumAddress) => {
    console.log(`
                      주소: ${data.address},
                      우편번호: ${data.zonecode}
                  `);
  };

  return (
    <>
      <div className="bg-blue-100">
        총 {addCommaKRW(totalPrice, true)}
        <div className="w-full mx-auto p-5">
          <form className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md">
            <div className="flex">
              <input
                type="text"
                name="address"
                placeholder="우편번호를 검색해 주세요"
                className="border border-gray-300 rounded-md p-2 focus:outline-none"
              />
              <button
                className="bg-blue-400 text-white font-semibold rounded-md p-2 hover:bg-blue-700 transition duration-200"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setOpenPostcode((prev) => !prev);
                }}
              >
                우편번호 찾기
              </button>
            </div>
            <input
              type="text"
              name="address"
              readOnly
              placeholder="기본 주소를 입력해 주세요"
              className="border border-gray-300 rounded-md p-2 focus:outline-none bg-gray-200"
            />
            <input
              type="text"
              name="addressDetail"
              placeholder="상세 주소를 입력해 주세요"
              className="border border-gray-300 rounded-md p-2 focus:outline-none"
            />
            <button className="bg-blue-400 text-white font-semibold rounded-md p-2 hover:bg-blue-700 transition duration-200">
              결제
            </button>
          </form>
        </div>
      </div>
      {openPostcode && (
        <AddressModal
          openPostcode={openPostcode}
          setOpenPostcode={setOpenPostcode}
          updateAddress={updateAddress}
        />
      )}
    </>
  );
};

export default PaymentForm;
