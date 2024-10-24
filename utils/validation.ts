import { z } from "zod";

/**
 * 이름에 대한 유효 조건을 설정합니다.
 * @param min 
 * @param max 
 * @returns 
 */
export const validNameCondition = (min: number, max: number) => {
  return z
      .string({ message: "문자열이어야 합니다." })
      .min(min, { message: `최소 이름을 ${min} 글자로 입력` })
      .max(max, { message: `최대 이름을 ${max} 글자로 입력` })
      .email()
};

export const validContentCondition = (min: number, max: number) => {
  return z
      .string({ message: "문자열이어야 합니다." })
      .min(min, { message: `최소 내용을 ${min} 글자로 입력` })
      .max(max, { message: `최대 내용을 ${max} 글자로 입력` })
      .email()
};

/**
 * TIL:: zod 라이브러리로 여러 가지를 사용할 수 있는데, .email().regex()를 기억해두자. 
  const validEmail = z.object({
    email: z
      .string()
      .email({ message: "이메일 형식이 아닙니다." })
      .regex(/@gmail.com/, { message: "구글 이메일만 사용 가능합니다." }),
  });


  이름의 유효 조건과 일치하지 않으면 아래와 같이 에러가 발생하는데, exact는 정확히 일치해야 한다는 의미이다.

  Validation errors: [
    {
        code: 'too_small',
        minimum: 2,
        type: 'string',
        inclusive: true,
        exact: false, // exact가 true라면 무조건 2글자여야만 하는 거겠지?
        message: '최소 이름을 2 글자로 설정',
        path: []
    }
  ]
 */



  // z.number().int().positive() // 카트에 -1을 넣을 수 없도록 방지

  // z.enum(["apple", "orange", "grape"]) // apple, orange, grape 중 하나여야 함
  // z.coerce.number() // 문자열을 숫자로 변환

// 대강 이런식으로 쓰는 것 같음.
  const validatedSearchParams = z.string().safeParse("test");
  if(!validatedSearchParams.success) {
    console.log(validatedSearchParams.error.errors);
  }

  // 열심히 safeParse를 백단의 route.ts에서 한다. 없을 경우 NextResponse.badRequest()로 처리한다.
  //  NextResponse.json(parsedForm.error, { status: 422 });