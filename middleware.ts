import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isSignedIn } from './api/userApi';


// const allowedOrigins = ['http://www.jinvicky.shop', 'https://www.jinvicky.shop', 'http://jinvicky.iptime.org'];

export async function middleware(request: NextRequest) {
    const result = await isSignedIn() as ApiResult<Boolean>;
    const url = request.nextUrl.clone();

    console.log('middleware', result, url.pathname);

    if (result.data) { // 세션 있음
        if (url.pathname === '/user/sign-in' || url.pathname === '/user/sign-up') { // 로그인페이지일 때 메인페이지로 이동
            url.pathname = '/';
            return NextResponse.redirect(url);
        }

    } else {
        if (url.pathname !== '/user/sign-in') { // 로그인페이지가 아닐 때만 로그인페이지로 이동
            url.pathname = '/user/sign-in';
            return NextResponse.redirect(url);
        }
    }
    // // 로그인 통과 시 요청을 계속 처리
    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/chat/:path*',
        // '/my-page/:path*',
        '/user/sign-in',
        // '/user/sign-up',
        // '/test/:path*',
        // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}