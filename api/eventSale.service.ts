import { EventProduct } from "@/types/product.type";

/**
 * 이벤트 상품 전체 조회
 */
export const fetchGetEventProductList = (url: string): Promise<EventProduct[]> =>
    fetch(
        process.env.NEXT_PUBLIC_DOMAIN_URL + url
    ).then(async (res: Response) => {
        const data = (await res.json()) as ApiResult<EventProduct[]>;
        return data.data;
    })