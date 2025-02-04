

export const selectPaymentRequestById = async (id: string) => {
    const resp = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/payment/request/${id}`)
    return await resp.json();
}