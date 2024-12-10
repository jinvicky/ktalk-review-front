interface ApiResult<T> {
    status: number;
    message: string;
    data: T;
}

export { ApiResult };
