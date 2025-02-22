import {Container } from "@mui/material";

import { selectSessionByCookie } from "@/api/userApi";

import ApplyForm from "@/app/(nav-footer)/commission/apply/components/ApplyForm";
import NonUserInfoHeader from "./components/NonUserInfoHeader";

const CommissionApplyPage = async () => {
    const respJson = await selectSessionByCookie();
    const userSession = respJson ? respJson.data : null;

    return (
        <div>
            <Container maxWidth="md" className="my-12">
                {!userSession && <NonUserInfoHeader />}
                <ApplyForm userInfo={userSession} />
            </Container>
        </div>
    )
}

export default CommissionApplyPage;