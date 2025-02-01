"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CommissionDetail from "@/components/my-page/CommissionDetail";

const MyCommissionByIdPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [commissionDetail, setCommissionDetail] = useState<CommissionApply | null>(null);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (resp) => {
            const data = await resp.json() as ApiResult<any>; // any를 커미션 정보 인터페이스로 변경
            console.log('resp:', data);

            if (data.status === "200") {
                setCommissionDetail(data.data);
            } else {
                alert(data.data.message);
                router.push('/my-page/commission/apply');

            }
        });

    }, []);


    return (
        <div>
            <CommissionDetail data={commissionDetail}/>
        </div>
    )
}

export default MyCommissionByIdPage;