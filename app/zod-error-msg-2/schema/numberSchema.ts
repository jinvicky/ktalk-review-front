import { z } from "zod";

const isNumberSchema = z
    .string()
    .transform((stringId: string, ctx) => {
        const num = Number(stringId);
        if (isNaN(num)) {
            ctx.addIssue({
                code: "custom",
                message: "숫자를 입력해 주세요",
                path: ['applyId']
            })
        }
        return num;
    })