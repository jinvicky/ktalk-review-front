import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";
import { applyIdSchema } from "./schema/reviewSchema";

interface Review {
  applyId: string;
  name: string;
  content: string;
}

const ReviewPage = async () => {
  let zodErrs = [] as z.ZodIssue[];
  
  async function handleSubmit(formData: FormData) {
    "use server";
    try {
      const result = await applyIdSchema.parseAsync(formData.get("applyId"));
    } catch (err) {
      if (err instanceof ZodError) {
        const {errors} = err;
        console.log("Failed:: ", errors);

        zodErrs = errors;
      }
    }
    return;
  }

  return (
    <div className="bg-rose-50 w-full h-full">
      <div className="font-bold text-center p-5">
        걍진의 오픈카톡 커미션 리뷰
      </div>
      <div className="bg-white mx-auto max-w-md p-6">
        <form className="space-y-4" action={handleSubmit}>
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
