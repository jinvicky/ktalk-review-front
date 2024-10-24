import { ZodError, z } from "zod";

export const applyIdSchema = z
    .string()
    .length(19, { message: "신청 ID는 19자리입니다" })
    .superRefine(async (applyId, ctx) => {
        if (isNaN(Number(applyId))) {
            ctx.addIssue({
                code: "custom",
                message: "숫자를 입력해 주세요",
                path: ['applyId']
            })
        }
        // 7253967683304165376는 존재하는 신청 id
        const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + '/applications/is-exist?applyId=' + applyId);
        const applyIdExists = await resp.json();

        if (!applyIdExists) {
            ctx.addIssue({
                code: "custom",
                message: "존재하지 않는 신청 id입니다.",
                path: ['applyId']
            })
        }
    })
// 통합된 스키마
// const reviewSchema = z.object({
//     applyId: applyIdSchema
// });