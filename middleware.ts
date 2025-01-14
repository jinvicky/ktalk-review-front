import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
    // 리다이렉트가 발생하는 곳을 제외한 나머지 경로에서만 리다이렉트를 발생시킴
    if (!(request.nextUrl.pathname.startsWith('/user/sign-in') || request.nextUrl.pathname.startsWith('/user/sign-up'))) {
        const url = new URL('/user/sign-in', request.url);
        return NextResponse.redirect(url);
    }

    // 로그인 통과 시 요청을 계속 처리
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/chat/:path*',
        '/my-page/:path*',
        '/user/sign-in',
        '/user/sign-up',
        // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}