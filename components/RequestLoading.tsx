import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export const RequestLoading = ({ message }: { message?: string }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex items-center justify-center">
            <div className="h-50 text-white font-bold text-2xl text-center">
                <SentimentSatisfiedAltIcon sx={{ fontSize: 120 }} />
                <div className="my-2">
                    {message ? message : "고객님의 요청을 처리중입니다."}
                    <br />
                    {"잠시만 기다려주세요."}
                </div>
            </div>
        </div>
    );
}

export default RequestLoading;