
import Image from "next/image";
import Link from "next/link";

import { Container } from "@mui/material";
import CommissionReviewList from "../../../components/commission/CommissionReviewList";

const CommissionPage = () => {
    return (
        <>
            <Container maxWidth="md" className="my-12">
                <div className="flex">
                    <Image src="/assets/image/acnh_couple2.png" alt="commission" width={500} height={400} />
                    <div className="w-1/2">
                        <h1 className="font-bold text-2xl p-3">걍진 커미션</h1>
                        <div>
                            <div>
                                * SD 게임 커미션을 주로 작업합니다.
                            </div>
                            <Link
                                href="/commission/apply"
                                className="block w-full bg-blue-500 hover:bg-blue-700 text-white text-center font-bold my-5 py-2 px-4 rounded"
                            >
                                신청하기
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <Image src="/assets/image/commission_info1.png" alt="commission" width={700} height={400} />
                    <Image src="/assets/image/commission_info2.png" alt="commission" width={700} height={400} />
                </div>

                <CommissionReviewList />
            </Container>
        </>
    );
};

export default CommissionPage;