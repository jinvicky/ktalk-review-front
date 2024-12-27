"use server";
import { revalidatePath } from "next/cache";

import { ReviewRegister } from "@/types/review.type";

export async function reviewFormSubmit(formData: FormData) {
  const review: ReviewRegister = {
    applyId: formData.get("applyId") as string,
    content: formData.get("content") as string,
  };

  fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + "/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  }).then((resp) => {
    if (resp.status === 500) {
      alert("서버 오류가 발생했습니다.");
      return;
    }

    if (resp.status === 200) {
      alert("리뷰가 등록되었습니다.");
    }
  });
  revalidatePath("/review");
}
