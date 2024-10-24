import prisma from "@/prisma/util/prisma";
import ReviewListClient from "../client/ReviewListClient";

export default async function ReviewList() {
  const reviewList = await prisma.review.findMany();
  return (
    <div>
      <h1>Review List</h1>
      <ReviewListClient reviewList={reviewList} />
    </div>
  );
}
