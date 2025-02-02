
/**
 * 전체 커미션 리뷰 리스트 조회
 */
export const selectCommissionReviewList = async () => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/commission/review/list")
    return await resp.json();
}