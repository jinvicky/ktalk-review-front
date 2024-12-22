"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { ZodIssue } from "zod";

import {
  isExistingApplyId,
  reviewValidCond,
} from "@/app/review/action/formValidate";

import { ReviewRegister } from "@/types/review.type";

const ReviewForm = () => {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ZodIssue[] | null>(null);

  const validateForm = async (formData: FormData) => {
    const applyId = formData.get("applyId") as string;
    const content = formData.get("content") as string;

    const result = reviewValidCond.safeParse({ applyId, content });

    if (!result.success) {
      setErrors(result.error.errors);
      return false;
    }

    const applyIdNotDuplicated = await isExistingApplyId(applyId);

    if (!applyIdNotDuplicated) {
      setErrors([
        {
          code: "custom",
          path: ["applyId"],
          message: "해당 신청 ID가 존재하지 않습니다.",
        },
      ]);
      return false;
    }
    setErrors(null);
    return true;
  };

  const reviewFormSubmit = (formData: FormData) => {
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
      if (resp.status === 200) {
        alert("리뷰가 등록되었습니다.");
        window.location.reload();
      } else if (resp.status === 501) {
        alert("리뷰가 이미 존재합니다.");
      } else {
        alert("리뷰 작성 도중 오류가 발생했습니다. 재시도해주세요");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 방지

    const formData = new FormData(formRef.current!);

    const isValid = await validateForm(formData);

    if (isValid) {
      await reviewFormSubmit(formData);
      formRef.current?.reset();
    }
  };

  const renderErrors = () => {
    if (!errors) return <></>;
    return (
      <div className="bg-red-100 text-red-500 p-2 rounded-md">
        {errors.map((error, idx) => (
          <p key={idx}>{error.message}</p>
        ))}
      </div>
    );
  };
  return (
    <div className="w-full mx-auto p-5">
      <form
        className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="applyId"
          placeholder="신청 ID를 입력해 주세요"
          className="border border-gray-300 rounded-md p-2 focus:outline-none"
        />
        <textarea
          placeholder="리뷰 내용을 입력해 주세요"
          name="content"
          className="border border-gray-300 rounded-md p-2 focus:outline-none resize-none"
          rows={7}
        />
        {renderErrors()}
        <button
          type="submit"
          className="bg-blue-400 text-white font-semibold rounded-md p-2 hover:bg-blue-700 transition duration-200"
        >
          {t("SUBMIT")}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
