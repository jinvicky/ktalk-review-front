interface ApiResult<T> {
    status: number;
    message: string;
    data: T;
}

interface PageInfo {
    page: number;
    size: number;
    totalCount: number;
}

interface CustPage<T> {
    list: T[];
    pageInfo: PageInfo;
}

export { ApiResult, PageInfo, CustPage };
