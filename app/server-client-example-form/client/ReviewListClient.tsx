"use client";

export default function ReviewListClient(props: any) {
  const { reviewList } = props;
  return (
      <ul>
        {reviewList.map((review: any) => (
          <li key={review.id}>
            <h2>이름: {review.name}  내용: {review.content }</h2>
          </li>
        ))}
      </ul>
  );
}
