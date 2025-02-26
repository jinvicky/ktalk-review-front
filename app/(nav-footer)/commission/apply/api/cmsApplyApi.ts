import { ResponseData, ResponseStatus } from "@/types/api.type";

const TIMEOUT = 10000;

export const insertNewApply = async (
    formData: FormData
): Promise<ResponseData> => {
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
        return await resp.json();
    } catch {
        const data = {
            status: ResponseStatus.Error,
            data: {
                message: "요청 도중 오류가 발생했습니다. 재시도해주세요",
            },
        };
        return data;
    } finally {
        clearTimeout(timeoutId);
    }
};

export const insertNewApplyFileList = async (
    formData: FormData
): Promise<ResponseData> => {
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

        if (resp.status === ResponseStatus.PayloadTooLarge) {
            const data = {
                status: ResponseStatus.PayloadTooLarge,
                data: {
                    message:
                        "첨부파일 용량이 너무 큽니다. pdf나 excel 문서 업로드를 고려해주세요",
                },
            };
            return data;
        }
        return await resp.json();
    } catch {
        const data = {
            status: ResponseStatus.Error,
            data: {
                message: "요청 도중 오류가 발생했습니다. 재시도해주세요",
            },
        };
        return data;
    } finally {
        clearTimeout(timeoutId);
    }
};
