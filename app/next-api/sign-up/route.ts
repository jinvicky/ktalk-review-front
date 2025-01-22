import { NextResponse } from "next/server";


export async function POST() {
    // 회원가입 요청, 회원가입과 동시에 로그인 처리를 하고 싶다.
    // 로그인의 post와 동일하게 쿠키를 생성해서 응답에 추가한다. 
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