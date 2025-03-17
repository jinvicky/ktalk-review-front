import { signOut } from "@/api/userApi";
import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { ServerResponseCode } from "@/types/api.type";

export async function POST() {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    if (!userSession) {
        return new NextResponse(
            JSON.stringify({ status: "401", message: '로그인이 필요합니다.' }),
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    const respFromBoot = await signOut(userSession) as ApiResult<boolean>;

    if (respFromBoot.status !== ServerResponseCode.Success) {
        return new NextResponse(
            JSON.stringify({ message: respFromBoot.data, status: respFromBoot.status }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    }

    return new NextResponse(
        JSON.stringify({ status: "200", message: '로그아웃 성공' }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `userSession=${respFromBoot.data}; HttpOnly; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
            },
        }
    );
}