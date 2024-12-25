import { z } from "zod";

export const isExistingApplyId = async (applyId: string) => {
  const resp = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN_URL +
      "/api/application/is-exist?applyId=" +
      applyId
  );
  return await resp.json();
};

export const reviewValidCond = z.object({
  applyId: z.string().nonempty("신청 ID를 입력해 주세요."),
  content: z.string().min(5, "리뷰 내용은 5자 이상 입력해 주세요."),
});
