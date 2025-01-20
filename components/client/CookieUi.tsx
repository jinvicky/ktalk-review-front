"use client";

interface CookieUiProps {
    cookie: string; // cookie prop의 타입을 string으로 정의
    // saveCookie: any;
}

const CookieUi = ({cookie}: CookieUiProps) => {

    const saveCookie = async() => {
        const resp = await fetch(`/next-api/server/cookie`, {
            method: 'POST',
        });

        const data = await resp.json();

        console.log('jvk saveCookie:', data);
    }
    return (
        <div className="bg-gray-50 w-full h-full">
            <div className="cookie-ui__content">
                <p>클라이언트 컴포넌트입니다.</p>
                <button className="cookie-ui__btn" onClick={saveCookie}>Accept</button>
                {cookie}
            </div>
        </div>
    )
}

export default CookieUi;