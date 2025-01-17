import { UserSignIn } from "@/types/userType";

export const isSignedIn = async (): Promise<ApiResult<Boolean>>=> {
    let url = process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:8080';

    const params = '?email=jvk@naver.com&nickname=jinvicky&role=admin';

    const response = await fetch(url + '/api/login/set-session-object'+params);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
} // 추후 삭제 예정 


// export const fetchSignIn = async (user: UserSignIn) => {
//     const response = await fetch('/api/user-ignore-session/sign-in',
//         {
//             body: JSON.stringify(user),
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include'
//         }
//     );

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// }