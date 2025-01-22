import { NextResponse } from "next/server";


export async function POST() {
    // 로그아웃 요청, 쿠키의 age를 0 또는 옛날로 만들어서 삭제
    return  new NextResponse(
        JSON.stringify({ message: 'Hello' }),
        {
            status: 200,
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Set-Cookie': `userSession=${cookieValue}; HttpOnly; Secure; Path=/; Expires=${expires.toUTCString()}; domain=${process.env.NEXT_PUBLIC_DOMAIN_URL};`,
            // },
            // www.jinvicky.shop으로 접근했을 때 쿠키를 만들면 도메인은 어느 경로로 설정되는가?
        }
    );
}