

import {cookies} from  'next/headers'

export default async function CookieWrapper() {

    console.log('CookieWrapper', cookies().get('auth_token'));
    // const getCookie = async () => {
    //     console.log(process.env.NEXT_PUBLIC_DOMAIN_URL, "jvk:???");
    //     const fetchCookie = await fetch('/api/test/get-cookie', {
    //         method: 'GET',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Jinvicky': 'jvk'
    //         }
    //     });
    //     await fetchCookie.json();
    // }

    return <>test</>;
}