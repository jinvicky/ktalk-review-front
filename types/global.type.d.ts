declare global {
  interface ApiResult<T> {
    status: number;
    message: string;
    data: T;
  }

  type NextApiResult = Pick<ApiResult<unknown>, "status" | "message">;

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
export {};
