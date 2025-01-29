import { cookies } from "next/headers";

const CommissionApplyPage = () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    return (
        <div>
            <h1>
                커미션 신청페이지
            </h1>
            {
                userSession ? (
                    <div>
                        <h2>로그인 되어 있습니다.</h2>
                    </div>
                ) : (
                    <div>
                        *비로그인 상태입니다. 비회원 신청시 쿠폰 및 리뷰 포인트 적립 등의 혜택에서 제외되며, 이후 로그인해도 현재 신청은 반영되지 않습니다.
                    </div>
                )
            }
        </div>
    )
}

export default CommissionApplyPage;