import { revalidatePath } from "next/cache";
import prisma from "@/prisma/util/prisma";
import { ZodError, z } from "zod";

interface Review {
  applyId: string;
  name: string;
  content: string;
}

const ReviewPage = async () => {
  let errors: any = {};
  async function handleSubmit(formData: FormData) {
    "use server"; // 함수 내용을 자동으로 서버 api로 만든다.
    const review: Review = {
      applyId: formData.get("applyId") as string,
      name: formData.get("name") as string,
      content: formData.get("content") as string,
    };

    const reviewSchema = z.object({
      applyId: z.number(), // 숫자면서 디비 내부 존재값이어야만 하며, 리뷰가 미작성이어야만 함
      name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
      content: z.string().min(5, { message: "내용은 5자 이상이어야 합니다." }),
    })
  
    const result = reviewSchema.safeParse(review);

    if (!result.success) {
      console.log("Review Validation Error:", result.error);
      errors = result.error; // 인식을 못함.
      return;
    }

    revalidatePath("/review"); // 해당 경로를 다시 렌더링한다. 추가하지 않으면 spa처럼 실시간 동작 안됨
  }

  return (
    <div className="bg-rose-50 w-full h-full">
      {errors.applyId && <div>{errors.applyId.message}</div>}
      <div className="font-bold text-center p-5">걍진의 오픈카톡 커미션 리뷰</div>
      <div className="bg-white mx-auto max-w-md p-6">
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="applyId"
              className="block text-sm font-medium text-gray-700"
            >
              신청ID
            </label>
            <input
              type="text"
              name="applyId"
              id="applyId"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="유효한 신청ID를 입력하세요"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="이름을 입력하세요(또는 익명 입력)"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              내용
            </label>
            <input
              type="text"
              name="content"
              id="content"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="내용을 입력하세요(최소 5자는 입력 부탁드려요)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
