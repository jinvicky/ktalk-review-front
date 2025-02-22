export const insertCommissionApply = async (formData: FormData) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply`, {
        method: "POST",
        body: formData,
    });

    if (resp.status === 413) {
        return {
            data: {
                message: "첨부파일 용량이 너무 큽니다. pdf나 excel 문서 업로드를 고려해주세요"
            }
        }
    }
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