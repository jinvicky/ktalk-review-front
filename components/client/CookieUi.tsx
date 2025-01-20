"use client";

interface CookieUiProps {
    cookie: string; // cookie prop의 타입을 string으로 정의
}

const CookieUi = ({cookie}: CookieUiProps) => {
    return (
        <div className="bg-gray-50 w-full h-full">
            <div className="cookie-ui__content">
                <p>클라이언트 컴포넌트입니다.</p>
                <button className="cookie-ui__btn">Accept</button>
                {cookie}
            </div>
        </div>
    )
}

export default CookieUi;