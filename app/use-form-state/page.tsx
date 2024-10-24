"use client";
import { Review } from "@/types/review.type";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "....처리중...." : "리뷰 제출"}
    </button>
  );
}

export default function ReviewForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [state, formAction] = useFormState(
    (previousState: Review, formData: FormData) =>
      submit(previousState, formData, formRef),
    {} as Review
  );

  const submit = async (
    previousState: Review,
    formData: FormData,
    formRef: React.RefObject<HTMLFormElement>
  ) => {
    const review: Review = {
      name: formData.get("name") as string,
      content: formData.get("content") as string,
    };

    await postReview(review);
    await fetchReviews();

    formRef.current?.reset();
    return review;
  };

  const postReview = async (review: Review) => {
    await fetch("http://localhost:3000/use-form-state/api", {
      method: "POST",
      body: JSON.stringify(review),
    });
  }

  const fetchReviews = async () => {
    const selectResp = await fetch("http://localhost:3000/use-form-state/api", {
      method: "GET",
    });
    setReviews(await selectResp.json());
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input type="text" name="name" />
        <input type="text" name="content" />
        <SubmitButton />
      </form>
      <div>
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={`review-${index}`}>
              {review.name} : {review.content}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
