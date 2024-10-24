"use client";

import { useRef } from "react";
import { actionSubmit } from "../server/actionSubmit";

export default function ReviewForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);
    await actionSubmit(formData);

    formRef.current?.reset();
  };

  return (
    <div>
      <h1>리뷰 전용 폼</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <input type="text" name="content" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
