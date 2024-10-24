import ReviewFormClient from "./client/ReviewFormClient";
import ReviewListServer from "./server/ReviewListServer";


const ApiConnectPage = () => {
    return (
        <div className="bg-rose-50 min-h-full">
            <h1>리뷰 리스트 실제 연동 테스트</h1>
            <ReviewFormClient />
            <ReviewListServer />
        </div>
    );
};

export default ApiConnectPage;