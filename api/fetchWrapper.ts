const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 후 타임아웃

export const customFetch = async (url: string) => {
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); // 성공적으로 응답 받으면 타임아웃 취소
        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.log('Request timed out');
        } else {
            console.error('Fetch error:', error);
        }
    }
};
