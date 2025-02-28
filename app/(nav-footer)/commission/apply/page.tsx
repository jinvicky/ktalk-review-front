import {Container } from "@mui/material";

import { selectSessionByCookie } from "@/api/userApi";

import ApplyForm from "@/app/(nav-footer)/commission/apply/components/ApplyForm";
import GuestInfoHeader from "./components/GuestInfoHeader";

const CommissionApplyPage = async () => {
    const respJson = await selectSessionByCookie();
    const userSession = respJson ? respJson.data : null;

    console.log('jvk session', userSession);

    return (
        <div>
            <Container maxWidth="md" className="my-12">
                {!userSession && <GuestInfoHeader />}
                <ApplyForm userInfo={userSession} />
            </Container>
        </div>
    )
}

export default CommissionApplyPage;