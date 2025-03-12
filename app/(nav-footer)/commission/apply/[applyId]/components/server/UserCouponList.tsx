import { cookies } from "next/headers";
import CouponCheckList from "../client/CouponCheckList"
import Link from "next/link";


interface Coupon {
    id: number;
    name: string;
    description: string;
}

const UserCouponList = () => {
    const cookieStore = cookies();
    const userSession = cookieStore.get('userSession')?.value;

    if (!userSession) {
        return <Link href={"/user/sign-in"} className="block text-rose-500 py-3">
            로그인이 필요한 서비스입니다.(클릭 시 이동)
        </Link>
    }

    // fetch()를 통해 사용자별 쿠폰 정보를 가져온다. 세션이 없다면 비회원 상태임을 고지한다. 
    const coupons: Coupon[] = [
        // {
        //     id: 1,
        //     name: "최초 회원가입 쿠폰",
        //     description: "2000원 할인 적용",
        // },
        // {
        //     id: 2,
        //     name: "쿠폰2",
        //     description: "쿠폰2 설명",
        // }
    ];

    if (coupons.length === 0) {
        return <p className="text-rose-500 py-3">사용 가능한 쿠폰이 없습니다.</p>
    }

    return <CouponCheckList coupons={coupons} />
}


export default UserCouponList;