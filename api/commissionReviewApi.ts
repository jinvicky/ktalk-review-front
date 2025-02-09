import { CommissionReviewReg } from "@/types/commission/CommissionReviewType";

/**
 * 전체 커미션 리뷰 리스트 조회
 */
export const selectCommissionReviewList = async () => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/commission/review/list")
    return await resp.json();
}

/**
 * 신규 커미션 리뷰 등록
 * @param review 
 * @returns 
 */
export const insertCommissionReview = async (review: CommissionReviewReg) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/commission/review", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    return await resp.json();
}