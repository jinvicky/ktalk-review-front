import { NextResponse } from "next/server";
import { fetchFromSpringBoot } from "../serverUserApi";

/**
 *  여기서 spring boot로 로그인 요청을 보낸 다음에, 
 *  응답이 200으로 오면 next.js가 쿠키를 생성해서 응답에 추가한다. (next.js 환경에 쿠키 저장)
 */
export async function POST() {

    // // 쿠키 설정 (예: 로그인 후 토큰 저장)
    // const cookieValue = Math.random();  // 예시로 JWT 토큰을 쿠키에 저장
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);  // 1시간 후 만료되는 쿠키

    // console.log('env url', process.env.NEXT_PUBLIC_DOMAIN_URL);

    const header = new Headers();

    fetchFromSpringBoot(header).then((data) => {
        console.log('call 101:', data);

        const cookieValue = data.userSession;
        
        return  new NextResponse(
            JSON.stringify({ message: 'Hello' }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `userSession=${cookieValue}; HttpOnly; Secure; Path=/; Expires=${expires.toUTCString()}; domain=${process.env.NEXT_PUBLIC_DOMAIN_URL};`,
                },
                // www.jinvicky.shop으로 접근했을 때 쿠키를 만들면 도메인은 어느 경로로 설정되는가?
            }
        );
    });

    // return response;
}
