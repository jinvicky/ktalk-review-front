import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/api/userAuth";

export async function POST(request: NextRequest) {
    const form = await request.json();
    const respFromBoot = await signIn(form) as ApiResult<string>;

    if (respFromBoot.status !== "200") {
        return new NextResponse(
            JSON.stringify({ message: respFromBoot.data , status: respFromBoot.status }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    }

    const duration = new Date(Date.now() + 1000 * 60 * 60 * 3).toUTCString(); // 3시간

    return new NextResponse(
        JSON.stringify({ status: "200", message: 'OK' }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `userSession=${respFromBoot.data}; HttpOnly; Secure; Path=/; Expires=${duration};`,
            },
        }
    );
}
