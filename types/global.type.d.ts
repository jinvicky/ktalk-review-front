declare global {
  interface ApiResult<T> {
    status: string;
    message: string;
    data: T;
  }

  type NextApiResult = Pick<ApiResult<unknown>, "status" | "message">;

  interface ApiError {
    status: string;
    message: string;
    data: string | Record<string, string>;
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
export {};
