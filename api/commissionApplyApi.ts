export const insertCommissionApply = async (formData: FormData) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply`, {
        method: "POST",
        body: formData,
    });
    return await resp.json();
}