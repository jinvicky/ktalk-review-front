// jvk:: 추후 수정
import Image from 'next/image';

import { CheckCircle, Cancel } from '@mui/icons-material';

interface ApplyAreaProps {
    applyVO: CommissionApply;
}

const ApplyArea = ({ applyVO }: ApplyAreaProps) => {
    return <div>
        <a className="flex items-center py-5" href="#apply-section">
            <h1 className="text-2xl font-bold">신청서</h1>
        </a>
        <div id="apply-section" className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
            {applyVO ? (
                <>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-lg font-semibold">
                            <span className="text-gray-600">신청자명</span>
                            <span className="text-gray-900">{applyVO.userName}</span>
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-gray-600">신청서 내용</div>
                            <div className="pt-3 text-gray-800">{applyVO.content}</div>
                        </div>
                        <div>
                            <span className="text-gray-600 text-lg font-semibold">닉네임 기재 여부</span>
                            <div className="flex gap-3 items-center text-gray-900 py-3">
                                {
                                    applyVO.nicknameYn === "Y"
                                        ? <>
                                            <CheckCircle className="text-green-500" />
                                            <div className="text-gray-800">{applyVO.nickname}</div>
                                        </>
                                        : <Cancel className="text-red-500" />
                                }
                            </div>
                        </div>
                        <div>
                            <span className="text-gray-600 text-lg font-semibold">이메일 전송 여부</span>
                            <div className="flex gap-3 items-center text-gray-900 py-3">
                                {
                                    applyVO.sendEmailYn === "Y"
                                        ? <>
                                            <CheckCircle className="text-green-500" />
                                            <div className="text-gray-800">{applyVO.sendEmail}</div>
                                        </>
                                        : <Cancel className="text-red-500" />
                                }
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-gray-600">첨부파일</div>
                            <div className="mt-3 flex gap-4 overflow-x-auto">
                                {applyVO.applyFileList.map((file: ApplyFile, index: number) => (
                                    <a
                                        key={index}
                                        className="flex-shrink-0"
                                        href={file.fileUrl}
                                        target="_blank"
                                    >
                                        <Image
                                            src={file.fileUrl}
                                            alt={file.publicId}
                                            width={200}
                                            height={100}
                                            className="rounded-md shadow-lg"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="py-5 text-center text-gray-600">신청서가 없습니다.</div>
            )}

        </div>
    </div>;
}

export default ApplyArea;