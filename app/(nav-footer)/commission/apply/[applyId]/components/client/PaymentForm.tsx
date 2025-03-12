import BankTransferPayForm from "@/components/payment/BankTransferPayForm";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UserCouponList from "../server/UserCouponList";


const PaymentForm = () => {
    
    return <>
        <div>
            <h2 className="text-lg font-semibold text-black">
                회원 쿠폰 사용
            </h2>
            <p>회원가입시 최초 1회 2000원 할인 쿠폰을 적용할 수 있습니다.</p>
            <UserCouponList />
        </div>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">결제수단</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    label="결제수단"
                // onChange={handleChange}
                >
                    <MenuItem value={10}>직접 계좌이체</MenuItem>
                    <MenuItem value={30}>신용카드/페이코/기타 결제</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <BankTransferPayForm />
    </>;
}

export default PaymentForm;