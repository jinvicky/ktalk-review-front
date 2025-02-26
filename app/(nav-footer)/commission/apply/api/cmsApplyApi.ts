export const insertNewApply = async (formData: FormData) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply/new`, {
        method: "POST",
        body: formData,
    });
    return await resp.json();
}

export const insertNewApplyFileList = async (formData: FormData) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply/new/file`, {
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