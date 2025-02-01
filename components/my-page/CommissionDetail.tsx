import Image from 'next/image';

import { Box, Container } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import fileDownload from 'js-file-download';

interface CommissionDetailProps {
    data: CommissionApply | null;
}
const CommissionDetail = ({ data }: CommissionDetailProps) => {
    if (!data) return <></>;

    const downloadFile = (fileUrl: string) => {
        fetch(fileUrl).then(async (resp) => {
            const blob = await resp.blob();
            fileDownload(blob, 'commission');
        });
    }
    return (
        <Container maxWidth="md" className="my-12">
            <Box className="bg-gray-200 px-8 py-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {/* api 바꿔야 함  */}
                    <h2 className="text-2xl font-semibold mb-4">커미션 최종 작업물</h2>
                    <div>
                        <div>이미지 클릭 시 다운로드됩니다.</div>
                        {data.applyFileList && data.applyFileList.length > 0 ? (
                            <ul>
                                {data.applyFileList.map((file: any, index: number) => (
                                    <li key={index}>
                                        <Image
                                            src={file.fileUrl}
                                            alt={`File ${file.publicId}`}
                                            className="w-full max-w-xs mt-2 rounded"
                                            layout="responsive"
                                            width={100}
                                            height={100}
                                            onClick={() => downloadFile("https://res.cloudinary.com/dkfwo8t0v/image/upload/cms_apply/aaqtyrmerwuxayze9qph.jpg")}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>첨부된 파일이 없습니다.</p>
                        )}
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">커미션 신청서 상세</h2>
                    {/* 신청자 정보 */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">신청서 정보</h3>
                        <p><strong>신청자명:</strong> {data.userName}</p>
                        <p><strong>이메일:</strong> {data.userEmail}</p>
                        <p><strong>닉네임 기재 여부:</strong> {data.nicknameYn === "Y" ? <RadioButtonUncheckedIcon /> : <ClearIcon />}</p>
                        {data.nickname && <p><strong>닉네임:</strong> {data.nickname}</p>}
                        <p><strong>이메일 전송 여부:</strong> {data.sendEmailYn === "Y" ? <RadioButtonUncheckedIcon /> : <ClearIcon />}</p>
                        {data.sendEmail && <p><strong>전송 이메일:</strong> {data.sendEmail}</p>}
                        <p><strong>회원 여부:</strong> {data.memberYn === "Y" ? <RadioButtonUncheckedIcon /> : <ClearIcon />}</p>
                    </div>

                    {/* 신청서 내용 */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">신청 내용</h3>
                        <p>{data.content}</p>
                    </div>
                    {/* 상태 */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Status</h3>
                        <p>{data.status}</p>
                    </div>

                    {/* 파일 리스트 */}
                    <div>
                        <h3 className="text-xl font-semibold">신청 이미지</h3>
                        {data.applyFileList && data.applyFileList.length > 0 ? (
                            <ul>
                                {data.applyFileList.map((file: any, index: number) => (
                                    <li key={index}>
                                        <a href={file.fileUrl} >
                                            <Image
                                                src={file.fileUrl}
                                                alt={`File ${file.publicId}`}
                                                className="w-full max-w-xs mt-2 rounded"
                                                layout="responsive"
                                                width={100}
                                                height={100}
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>첨부된 파일이 없습니다.</p>
                        )}
                    </div>
                </div>
            </Box>
        </Container >
    );
}

export default CommissionDetail;
