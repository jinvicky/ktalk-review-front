import { ClientResponseCode } from "@/types/api.type";
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
 */
export const insertCommissionReview = async (review: CommissionReviewReg) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    try {
        const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/commission/review", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });
        return await resp.json();
    } catch {
        return {
            status: ClientResponseCode.FetchFailed,
            message: '[FETCH ERROR] insertCommissionReview',
            data: null
        }
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * 신청서 id로 단일 커미션 리뷰 조회 
 */
export const selectReviewByApplyId = async (applyId: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const resp: Response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/commission/review/apply-id/${applyId}`, {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
        });

        if (!resp.ok) throw new Error();
        return await resp.json();
    } catch {
        return {
            status: ClientResponseCode.FetchFailed,
            message: '[FETCH ERROR] selectReviewByApplyId',
            data: null
        }
    } finally {
        clearTimeout(timeoutId);
    }
};
