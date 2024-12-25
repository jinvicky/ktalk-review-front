export const generateUniqueIdByPrfix = (prefix: string) => {
  const now = new Date();
  const dateTime = now
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14); // YYYYMMDDHHMMSS
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4자리 난수
  return `${prefix}-${dateTime}-${randomNum}`;
};
