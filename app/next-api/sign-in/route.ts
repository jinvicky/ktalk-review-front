import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/api/userApi";

/**
 *  여기서 spring boot로 로그인 요청을 보낸 다음에, 
 *  응답이 200으로 오면 next.js가 쿠키를 생성해서 응답에 추가한다. (next.js 환경에 쿠키 저장)
 */
export async function POST(request: NextRequest) {
    const form = await request.json();
    const respFromBoot = await signIn(form) as ApiResult<number>;

    return new NextResponse(
        JSON.stringify({ message: 'OK' }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `userSession=${respFromBoot.data}; HttpOnly; Secure; Path=/; Expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString()};`,
            },
        }
    );
}
