export const insertCommissionApply = async (formData: FormData) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply`, {
        method: "POST",
        body: formData,
    });
    return await resp.json();
}

// 신청서 상세 조회 (결제 내역 리스트도 같이 조회할까 고민중)
export const selectCommissionApplyById = async (id: string) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    return await resp.json();
}