
export const isSignedIn = async (): Promise<ApiResult<Boolean>>=> {
    let url = process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:8080';

    const response = await fetch(url + '/api/test/redis/is-signed-in?email=jvk@naver.com');

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}