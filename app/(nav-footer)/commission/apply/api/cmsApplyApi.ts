import { ClientResponseCode} from "@/types/api.type";

const TIMEOUT = 10000;

export const insertNewApply = async (
    formData: FormData
): Promise<ApiResult<number>> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
    try {
        const resp = await fetch(
            process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply/new`,
            {
                method: "POST",
                body: formData,
                signal: controller.signal,
            }
        );

        if (!resp.ok) {
            throw new Error();
        }

        return await resp.json();
    } catch {
        return {
            status: ClientResponseCode.FetchFailed,
            message: '신청서 등록에 실패했습니다. 재시도 혹은 작가에게 문의해주세요 - [FETCH ERROR] insertNewApplyFileList',
            data: 0
        };
    } finally {
        clearTimeout(timeoutId);
    }
};

export const insertNewApplyFileList = async (
    formData: FormData
): Promise<ApiResult<number>> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
    try {
        const resp = await fetch(
            process.env.NEXT_PUBLIC_DOMAIN_URL +
            `/api/commission/apply/new/file`,
            {
                method: "POST",
                body: formData,
                signal: controller.signal,
            }
        );

        if (resp.status === ClientResponseCode.PayloadTooLarge) {
            return {
                status: ClientResponseCode.PayloadTooLarge,
                message: '첨부파일 용량이 너무 큽니다. pdf나 excel 문서 업로드를 고려해주세요',
                data: 0
            };
        }

        if(!resp.ok) throw new Error();
        return await resp.json();
    } catch {
        return {
            status: ClientResponseCode.FetchFailed,
            message: '신청서 파일 업로드에 실패했습니다. 재시도 혹은 작가에게 문의해주세요 - [FETCH ERROR] insertNewApplyFileList',
            data: 0
        };
    } finally {
        clearTimeout(timeoutId);
    }
};
