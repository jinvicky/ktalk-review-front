
export const fetchFromSpringBoot = async (headerArg: Headers) => {
    const response = await fetch(process.env.NEXT_DOMAIN_URL + `/api/from-next`, { // boot의 api
        method: 'POST', 
        headers: headerArg
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
