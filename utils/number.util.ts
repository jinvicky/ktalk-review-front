export const addCommaKRW = (
  price: number,
  useFormat: boolean = false
): string => {
  return price
    .toLocaleString("ko-KR", { maximumFractionDigits: 3 })
    .concat(useFormat ? "원" : "");
};
