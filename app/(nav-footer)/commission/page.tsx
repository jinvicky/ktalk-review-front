
import Image from "next/image";
import Link from "next/link";

import { Container } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

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

                <div>
                    <h1 className="font-bold text-2xl p-3">리뷰</h1>
                    {/* 꾸밈용 라인 */}
                    <div className="w-full h-[2px] bg-gray-700"></div>
                    <div className="w-full flex">
                        <ul className="w-full">
                            <li className="border-b border-gray-300 p-3">
                                <div>
                                    <span className="font-bold text-lg">
                                        동숲페어커미션
                                    </span>
                                    <span className="ml-5 text-gray-500">2025. 01. 12</span>
                                    <p className="py-3">문의 드리자마자 거의 칼답으로 대답해주시고, 원하는 구도로 예쁘게 잘 그려주셔서 너무 만족 하였습니다 🩷
                                    </p>
                                </div>
                            </li>
                            <li className="border-b border-gray-300 p-3">
                                <div>
                                    <span className="font-bold text-lg">
                                        동숲페어커미션
                                    </span>
                                    <span className="ml-5 text-gray-500">2025. 01. 12</span>
                                    <p className="py-3">문의 드리자마자 거의 칼답으로 대답해주시고, 원하는 구도로 예쁘게 잘 그려주셔서 너무 만족 하였습니다 🩷
                                    </p>

                                </div>
                            </li>
                            <li className="border-b border-gray-300 p-3">
                                <div>
                                    <span className="font-bold text-lg">
                                        동숲페어커미션
                                    </span>
                                    <span className="ml-5 text-gray-500">2025. 01. 12</span>
                                    <p className="py-3">문의 드리자마자 거의 칼답으로 대답해주시고, 원하는 구도로 예쁘게 잘 그려주셔서 너무 만족 하였습니다 🩷
                                    </p>

                                </div>
                            </li>

                            <button className="w-full p-3 text-center">
                                <KeyboardDoubleArrowDownIcon />
                            </button>
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default CommissionPage;