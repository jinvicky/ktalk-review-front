/** 서버에서 주는 status 응답값 입니다. */
export enum ServerResponsecode {
    Success = 200,
    ApiNotFound = 404,
}

/**
 * 클라이언트 레벨의 응답 코드입니다. 
 */
export enum ClientResponseCode {
    BadRequest = 400,
    PayloadTooLarge = 413,
    FetchFailed = 999, // 인터넷 연결 등의 원인으로 서버 도달 실패
}

/** api 응답 기본 데이터 형식입니다. todo:: 추후 삭제 */
export interface ResponseData {
    status: ServerResponsecode;
    data: {
        message: string;
    };
}
