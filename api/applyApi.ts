export const selectOneApplyById = async (id: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const resp: Response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/commission/apply/${id}`, {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
        });
        
        if (!resp.ok) {
            throw new Error();
        }

        return await resp.json();
    } catch {
        return {
            status: 999,
            message: '[FETCH ERROR] selectCommissionApplyById',
            data: null
        }
    } finally {
        clearTimeout(timeoutId);
    }
};
