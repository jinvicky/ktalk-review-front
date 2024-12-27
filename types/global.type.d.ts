declare global {
  interface ApiResult<T> {
    status: string;
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

  interface PayApp {
    setDefault: (key: string, value: string) => void;
    setParam: (key: string, value: string) => void;
    setTarget: (target: string) => void;
    call: () => void;
  }
}
export { };
