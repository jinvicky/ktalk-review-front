const formatDateArray = (dateArr: number[]) => {
  const date = new Date(
    Date.UTC(
      dateArr[0], // 년
      dateArr[1] - 1, // 월 (0부터 시작하므로 1을 빼줍니다)
      dateArr[2], // 일
      dateArr[3], // 시
      dateArr[4], // 분
      dateArr[5] // 초
    )
  );

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);

  return formattedDate;
};

export { formatDateArray };
