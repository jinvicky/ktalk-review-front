
export const fetchFromSpringBoot = async (headerArg: Headers) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/user/from-next`, { // boot의 api
        method: 'POST', 
        headers: headerArg
    });

    return await resp.json();
}
