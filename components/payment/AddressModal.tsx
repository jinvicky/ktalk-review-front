"use client";
import { SetStateAction } from "react";

import DaumPostcode from "react-daum-postcode";

import { DaumAddress } from "@/types/address.type";

import CustomModal from "@/components/Modal";

interface AddressModalProps {
  openPostcode: boolean;
  setOpenPostcode: (value: SetStateAction<boolean>) => void;
  updateAddress: (data: DaumAddress) => void;
}

const AddressModal = ({
  openPostcode,
  setOpenPostcode,
  updateAddress,
}: AddressModalProps) => {
  const handle = {
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    selectAddress: (data: DaumAddress) => {
      updateAddress(data);
      setOpenPostcode(false);
    },
  };
  return (
    <>
      {openPostcode && (
        <CustomModal
          open={openPostcode}
          setOpen={() => setOpenPostcode(!openPostcode)}
          hideButton={true}
        >
          <DaumPostcode onComplete={handle.selectAddress} autoClose={false} />
        </CustomModal>
      )}
      <button onClick={handle.clickButton}>우편번호 찾기</button>
    </>
  );
};

export default AddressModal;
