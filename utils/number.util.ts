/**
 * 금액을 KRW 기준 ,를 붙인 문자열로 반환
 * @param price 
 * @param useFormat 
 * @returns 
 */
export const addCommaKRW = (
  price: number,
  useFormat: boolean = false
): string => {
  return price
    .toLocaleString("ko-KR", { maximumFractionDigits: 3 })
    .concat(useFormat ? "원" : "");
};

/**
 * payApp 수수료를 추가한 금액을 반환
 * 6.5% 수수료를 올림하여 백 원 단위로 결제
 * @param price - 원래 금액
 * @returns 수수료가 추가된 금액 (백 원 단위로 올림 처리됨)
 */
export const addPayappFee = (price: number): number => {
  const fee = price * 0.065;
  const feeRounded = Math.ceil(fee / 100) * 100;
  return price + feeRounded;
}

export const byteToMb = (byteSize: number): number => { 
  return byteSize / (1024 * 1024); 
}

export const mbToByte = (mbSize: number): number => {
  return mbSize * 1024 * 1024;
}