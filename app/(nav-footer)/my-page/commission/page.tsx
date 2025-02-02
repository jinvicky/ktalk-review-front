import { cookies } from "next/headers";
import Link from "next/link";

const CommissionApplyListPage = async () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession');

    const resp = await fetch(process.env.NEXT_DOMAIN_URL + '/api/commission/apply', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'userSession': userSession?.value || '',
        },
    });

    const data = await resp.json() as ApiResult<CommissionApply[]>;

    if (data.status !== "200") {
        alert(data.message);
    }

    console.log('resp:', data);

    return <>
        <div>
            <h1>커미션 신청 목록</h1>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border border-gray-300">번호</th>
                            <th className="px-4 py-2 border border-gray-300">신청서 제목</th>
                            <th className="px-4 py-2 border border-gray-300">상태</th>
                            <th className="px-4 py-2 border border-gray-300">신청날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((commission: CommissionApply, index: number) => (
                            <tr key={commission.id} className="hover:bg-gray-50 [&>td]:text-center">
                                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <Link href={`/my-page/commission/apply/${commission.id}`}>
                                        {commission.title ? commission.title : "신청서-" + commission.id}
                                    </Link>
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {commission.status}
                                    <div className="bg-blue-500 font-bold text-white text-center text-xs px-2 py-1 rounded-md mt-1 cursor-pointer">
                                        리뷰 작성
                                    </div>
                                </td>
                                <td className="px-4 py-2 border border-gray-300">{commission.rgtrDt}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </>

};

export default CommissionApplyListPage;