"use client";

import { applyIdSchema } from "@/app/zod-error-msg-2/schema/reviewSchema";
import { useRef, useState } from "react";
import { ZodError, z } from "zod";
import ErrorServer from "../server/ErrorServer";

const ReviewFormClient = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [zodErrs, setZodErrs] = useState<z.ZodIssue[] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 방지

    const formData = new FormData(formRef.current!);

    console.log("let's jvk", await ErrorServer()) // ok 제대로 0 가져옴

    // try {
    //   const result = await applyIdSchema.parseAsync(formData.get("applyId"));
    // } catch (err) {
    //   if (err instanceof ZodError) {
    //     const { errors } = err;
    //     console.log("Failed:: ", errors);

    //     setZodErrs(errors);
    //   }
    // }
    // console.log("formData: ", formData.get("applyId")); // ok

    // formRef.current?.reset(); // 폼 리셋
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {zodErrs && zodErrs.map((err, idx) => <div key={idx}>{err.message}</div>)}
      <input className="border" type="text" name="applyId" />
      <input className="border" type="text" name="content" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewFormClient;
