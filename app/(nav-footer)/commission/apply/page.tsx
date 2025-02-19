import { Box, Container } from "@mui/material";

import { selectSessionByCookie } from "@/api/userApi";

import CommissionApplyForm from "@/components/commission/apply/CommissionApplyForm";
import NonUserInfoHeader from "./components/NonUserInfoHeader";

const CommissionApplyPage = async () => {
    const userSession = await selectSessionByCookie();

    return (
        <div>
            <Container maxWidth="md" className="my-12">
                {!userSession && <NonUserInfoHeader />}
                <CommissionApplyForm userInfo={userSession ?? null} />
            </Container>
        </div>
    )
}

export default CommissionApplyPage;