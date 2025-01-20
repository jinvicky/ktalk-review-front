
export const fetchFromSpringBoot = async (headerArg: Headers) => {

    // console.log('fetchFromSpringBoot', process.env.NEXT_DOMAIN_URL); //ok

    const response = await fetch(process.env.NEXT_DOMAIN_URL + `/api/from-next`, { // boot의 api
        method: 'POST', 
        headers: headerArg
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}




/**
 * post가 수십개가 되는 상황에서 route.ts의 post 1개로 핸들링 절대 안된다. 
 * 
 * fetch()를 호출할 때 특정 경우만 headers에 쿠키를 넣는 wrapper 함수를 만들어야 한다. 
 * 
 * 
 */