import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


import { cookies } from 'next/headers'


// const allowedOrigins = ['http://www.jinvicky.shop', 'https://www.jinvicky.shop', 'http://jinvicky.iptime.org'];

export async function middleware(request: NextRequest) {

    const cookieStore = cookies();

    console.log('cookieStore', cookieStore);
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/chat/:path*',
        // '/my-page/:path*',
        '/user/sign-in',
        // '/user/sign-up',
        '/test/:path*',
        // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}