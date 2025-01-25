import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/api/userApi";

export async function POST(request: NextRequest) {
    const form = await request.json();
    const respFromBoot = await signIn(form) as ApiResult<number>;

    const duration = new Date(Date.now() + 1000 * 60 * 60 * 3).toUTCString(); // 3시간

    return new NextResponse(
        JSON.stringify({ message: 'OK' }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `userSession=${respFromBoot.data}; HttpOnly; Secure; Path=/; Expires=${duration};`,
            },
        }
    );
}
