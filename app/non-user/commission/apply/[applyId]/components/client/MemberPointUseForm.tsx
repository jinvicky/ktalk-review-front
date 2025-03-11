"use client";
import { useState } from "react";

import { TextField } from "@mui/material";
import { addCommaKRW } from "@/utils/number.util";

const MemberPointUseForm = () => {
    // 멤버한테만 보여야 하는 건데 이걸 어떻게 처리?
    const [point, setPoint] = useState("0");
    return <>
        <div className="flex items-center space-x-2 text-lg font-semibold">
            <span className="text-gray-600">멤버 포인트 사용하기</span>
        </div>
        <span className="text-gray-600">잔여 포인트 : {addCommaKRW(2000)} 포인트</span>
        <div className="flex gap-3 pt-3">
            <TextField
                label="포인트를 입력해 주세요"
                variant="outlined"
                // value={point}
                onChange={(e) => setPoint(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => { }}
            >
                사용
            </button>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => { }}
            >
                전액 사용
            </button>
        </div>
    </>;
}

export default MemberPointUseForm;