import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get('auth_token');  // 'auth_token' 쿠키 값 가져오기

    console.log('Received Cookie:', cookie);

    return new NextResponse(
        JSON.stringify({ message: 'Cookie received', cookie }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}

/**
 *  여기서 spring boot로 로그인 요청을 보낸 다음에, 
 *  응답이 200으로 오면 next.js가 쿠키를 생성해서 응답에 추가한다. (next.js 환경에 쿠키 저장)
 */
export async function POST(request: NextRequest) {

    // 쿠키 설정 (예: 로그인 후 토큰 저장)
    const cookieValue = Math.random();  // 예시로 JWT 토큰을 쿠키에 저장
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);  // 1시간 후 만료되는 쿠키

    const response = new NextResponse(
        JSON.stringify({ message: 'Hello' }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `auth_token=${cookieValue}; HttpOnly; Secure; Path=/; Expires=${expires.toUTCString()}`,
            },
        }
    );

    return response;
}
