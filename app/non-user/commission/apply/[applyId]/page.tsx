import NonUserReviewModalButton from "./NonUserReviewModalButton";
import Image from 'next/image';

// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import CopyToClipboard from "react-copy-to-clipboard";
// import Link from "next/link";
import PaymentRequestForm from "@/components/payment/PaymentRequestForm";

/**
 * 신청서, 결제 내역 상세
 */
const NonUserCommissionApplyDetailPage: React.FC<{ params: { applyId: string } }> = async ({ params }) => {
    const applyId = params.applyId;
    const data = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + `/api/commission/apply/contract/${applyId}`, { cache: 'no-store' }).then(async (res) => await res.json());

    if (!data.data) {
        return <div>신청서가 존재하지 않거나 삭제되었습니다.</div>
    }

    const { applyVO, payRequestVO, paymentVO, reviewVO } = data.data;

    return <div className="p-5">
        <div className="">
            <h1 className="text-2xl font-bold">{applyVO.title}</h1>
            <div className="py-3 text-gray-500 font-bold">
                * 비회원 신청서는 보안을 위해 작업이 완료된 후 2일 내로 삭제됩니다.
            </div>
        </div>
        <div>
            <div className="flex items-center py-5">
                <h1 className="text-2xl font-bold">리뷰 내역</h1>
                <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
            </div>
            <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                {
                    reviewVO ? <div>
                        <div>
                            {reviewVO.content}
                        </div>
                        <div className="mt-2">
                            {reviewVO.rgtrDtFormatted}
                        </div>
                    </div>
                        : <div>
                            <NonUserReviewModalButton
                                applyId={applyId}
                            />
                            <div className="mt-2">아직 작성된 리뷰가 없습니다.</div>
                        </div>
                }
            </div>
        </div>
        <div>
            <div className="flex items-center py-5" id="apply-section">
                <h1 className="text-2xl font-bold">신청서 내역</h1>
                <button>
                    <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                {applyVO && <>
                    <div>
                        신청자명: {applyVO.userName}
                    </div>
                    <div>
                        <div>
                            신청서 내용
                        </div>
                        <div className="pt-3 font-normal">{applyVO.content}</div>
                    </div>
                    <div>
                        첨부파일
                        <div className="mt-3 flex overflow-x-scroll">
                            {
                                applyVO.applyFileList.map((file: ApplyFile, index: number) => <Image key={index}
                                    src={file.fileUrl}
                                    alt={file.publicId}
                                    width={200}
                                    height={100}
                                />)
                            }
                        </div>
                    </div>
                </>
                }
                {payRequestVO ?
                    <>
                        <div>
                            협의사항: {payRequestVO.discussion}
                        </div>
                        <div>
                            결제여부: {payRequestVO.payYn === "Y" ? "결제완료" : "미결제"}
                        </div>
                        <div>
                            결제요청날짜: {payRequestVO.rgtrDtFomatted}
                        </div>
                    </>
                    : <div className="py-5">결제 요청서가 없습니다.</div>
                }
            </div>
        </div>
        <div>
            <div className="flex items-center py-5" id="pay-request-section">
                <h1 className="text-2xl font-bold">결제요청서 내역</h1>
                <button>
                    <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                {payRequestVO ? <>
                    <div>결제 요청 금액: {payRequestVO.price}</div>

                    <div>
                        협의사항: {payRequestVO.discussion}
                    </div>
                    {/* <div>
                        결제여부: {payRequestVO.payState === "4" ? "결제완료" : "미결제"}
                    </div> */}
                    <div>
                        결제요청날짜: {payRequestVO.rgtrDtFomatted}
                    </div>
                </> : <div className="py-5">결제 요청서가 없습니다.</div>
                }
            </div>
        </div>
        <div>
            <div className="flex items-center py-5">
                <h1 className="text-2xl font-bold">결제 내역</h1>
                <button>
                    <KeyboardArrowDownIcon style={{ fontSize: 50 }} />
                </button>
            </div>
            <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
                {paymentVO ? <>
                    <div>결제 금액: {paymentVO.price}</div>
                    <div>
                        결제수단: {paymentVO.payType === "61" ? "계좌이체" : paymentVO.payType}
                    </div>
                    <div>
                        결제자명: {paymentVO.userName}
                    </div>
                    <div>
                        결제날짜: {paymentVO.payDtFomatted}
                    </div>
                </> : payRequestVO ? <PaymentRequestForm data={payRequestVO} /> : <div className="py-5">결제 요청서가 있어야 결제할 수 있습니다.</div>
                }
            </div>
        </div>
    </div >
}

export default NonUserCommissionApplyDetailPage;