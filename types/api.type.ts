/** 서버에서 주는 status 응답값 입니다. */
export enum ResponseStatus {
    Error = 500,
    Success = 200,
    Faill = 400,
    PayloadTooLarge = 413,
}

/** api 응답 기본 데이터 형식입니다. */
export interface ResponseData {
    status: ResponseStatus;
    data: {
        message: string;
    };
}
