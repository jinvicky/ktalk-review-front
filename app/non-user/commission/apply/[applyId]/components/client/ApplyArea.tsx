// jvk:: 추후 수정
import Image from 'next/image';

import { CheckCircle, Cancel } from '@mui/icons-material';

interface ApplyAreaProps {
    applyId: string;
    applyVO: any;
}

const ApplyArea = ({ applyId, applyVO }: ApplyAreaProps) => {
    return <div>
        <div className="flex items-center py-5" id="apply-section">
            <h1 className="text-2xl font-bold">신청서</h1>
        </div>
        <div className="[&>div]:font-bold [&>div]:text-gray-500 [&>div]:py-3">
            {applyVO ? (
                <>
                    <div className="space-y-4">
                        {/* 신청자명 */}
                        <div className="flex items-center space-x-2 font-semibold text-lg">
                            <span className="text-gray-600">신청자명</span>
                            <span className="text-gray-900">{applyVO.userName}</span>
                        </div>

                        {/* 신청서 내용 */}
                        <div>
                            <div className="text-lg font-semibold text-gray-600">신청서 내용</div>
                            <div className="pt-3 text-gray-800">{applyVO.content}</div>
                        </div>
                        <div>
                            <span className="text-gray-600">닉네임 기재 여부</span>
                            <span className="text-gray-900">
                                {
                                    applyVO.nicknameYn === "Y"
                                        ? <CheckCircle className="text-green-500" />
                                        : <Cancel className="text-red-500" />
                                }
                            </span>
                            <div className="pt-3 text-gray-800">{applyVO.nickname}</div>
                        </div>

                        {/* 첨부파일 */}
                        <div>
                            <div className="text-lg font-semibold text-gray-600">첨부파일</div>
                            <div className="mt-3 flex gap-4 overflow-x-auto">
                                {applyVO.applyFileList.map((file: ApplyFile, index: number) => (
                                    <div key={index} className="flex-shrink-0">
                                        <Image
                                            src={file.fileUrl}
                                            alt={file.publicId}
                                            width={200}
                                            height={100}
                                            className="rounded-md shadow-lg"
                                        />
                                    </div>
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