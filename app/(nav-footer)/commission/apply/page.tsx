import { cookies } from "next/headers";
import { Box, Container } from "@mui/material";
import CommissionApplyForm from "@/components/commission/apply/CommissionApplyForm";

const CommissionApplyPage = () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    // userSession이 있으면 boot로부터 email, nickname 정보를 가져와서 아래에 props로 내려주기

    return (
        <div>
            <Container maxWidth="md" className="my-12">
                {!userSession && (
                    <Box className="bg-white px-8 py-4">
                        <div className="font-semibold text-red-500">
                            <div>
                                *비로그인 상태입니다.
                            </div>
                            <div>
                                *비회원 신청시 쿠폰 및 리뷰 포인트 적립 등의 혜택에서 제외되며, 이후 로그인해도 현재 신청은 반영되지 않습니다.
                            </div>
                        </div>
                    </Box>
                )}
                <CommissionApplyForm />
            </Container>
        </div>
    )
}

export default CommissionApplyPage;