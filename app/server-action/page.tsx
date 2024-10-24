import { revalidatePath } from "next/cache";
import prisma from "@/prisma/util/prisma";
import { Review } from "@/types/review.type";
/**
 * use client와 use server가 헷갈려서 고생했다.
 *
 * useState를 쓰려면 use client를 써야하고, 그러면 인라인 use server를 사용하지 못한다.
 * use server를 사용하려면 useState를 사용하지 못한다.
 *
 * reference::
 * https://codingapple.com/unit/nextjs-server-actions/
 */

const ReviewPage = async () => {
  async function handleSubmit(formData: FormData) {
    "use server"; // 함수 내용을 자동으로 서버 api로 만든다.
    const review: Review = {
      name: formData.get("name") as string,
      content: formData.get("content") as string,
    };

    const newReview = await prisma.review.create({
      data: {
        ...review,
      },
    });
    console.log("new Review Created:", newReview);
    await prisma.$disconnect();

    revalidatePath("/review"); // 해당 경로를 다시 렌더링한다. 추가하지 않으면 spa처럼 실시간 동작 안됨
  }

  let reviews: Review[] = await prisma.review.findMany(); // TIL:: 새로배웠다.

  function renderReviews() {
    return reviews.map((review, index) => (
      <li
        key={`review-${index}`}
        className="p-4 mb-4 rounded-lg shadow-sm bg-white"
      >
        <div className="text-lg font-semi-bold mb-2">{review.content}</div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-600">{review.name}</span>
          <span className="text-sm text-gray-400">2024-04-20</span>
        </div>
      </li>
    ));
  }

  return (
    <div className="bg-rose-50 w-full h-full">
      <h1>Review Page</h1>
      <form action={handleSubmit}>
        <input type="text" name="name" />
        <input type="text" name="content" />
        <button type="submit">Submit</button>
      </form>
      <div className="px-5">
        <h2>Reviews</h2>
        <ul className="grid grid-cols-4 gap-4">{renderReviews()}</ul>
      </div>
    </div>
  );
};

export default ReviewPage;
