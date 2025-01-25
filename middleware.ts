import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession');
    /**
     * userSession은 {name: '', value:''} 형태다.
     */
    const currentPath = request.nextUrl.pathname;
    
    if (userSession === undefined || !userSession?.value) {
        
        if (currentPath === '/user/sign-in' || currentPath === '/user/sign-up') {
            // 로그인을 안 했는데 로그인/회원가입으로 오면 그냥 통과
            return NextResponse.next();
        }
        // 그외 전부 로그인 페이지로 이동
        return NextResponse.redirect(new URL('/user/sign-in', request.url));
    } else {
        // 로그인을 했는데 로그인/회원가입으로 오면 메인(promotion)으로 보내기
        if (currentPath === '/user/sign-in' || currentPath === '/user/sign-up') {
            return NextResponse.redirect(new URL('/promotion', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/chat/:path*',
        // '/my-page/:path*',
        '/user/sign-in',
        '/user/sign-up',
        // '/test/:path*',
        // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}