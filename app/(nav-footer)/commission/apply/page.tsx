import { cookies } from "next/headers";
import { Container } from "@mui/material";
import CommissionApplyForm from "@/components/commission/apply/CommissionApplyForm";

const CommissionApplyPage = () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    return (
        <div>
            <Container maxWidth="md" className="my-12">
                {
                    !userSession && (
                        <div>
                            *비로그인 상태입니다. 비회원 신청시 쿠폰 및 리뷰 포인트 적립 등의 혜택에서 제외되며, 이후 로그인해도 현재 신청은 반영되지 않습니다.
                        </div>
                    )
                }
                <CommissionApplyForm />
            </Container>
        </div>
    )
}

export default CommissionApplyPage;