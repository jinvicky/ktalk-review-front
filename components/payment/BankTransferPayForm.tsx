"use client";

import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { TextField } from "@mui/material";

const BankTransferPayForm = ({ ownerName }: { ownerName?: string }) => {
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState(ownerName);

    return <>
        <h2 className="text-xl font-semibold mb-2">계좌이체</h2>
        <p>아래 계좌로 이체 후 입금자명을 제출해 주세요</p>
        <div className="pt-3 text-gray-700 flex items-center gap-3">
            <p className="text-lg">남궁진 하나은행 32591038729807</p>
            <CopyToClipboard
                text="32591038729807"
                onCopy={() => setCopied(true)}
            >
                <button className="px-4 py-2 bg-blue-100 rounded-lg font-bold text-blue-500">
                    계좌복사
                </button>
            </CopyToClipboard>
            {copied && <span className="text-sm">복사되었습니다</span>}
        </div>
        <div className="my-5 flex gap-3">
            <TextField
                label="입금자명"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => { }}
            >
                제출
            </button>
        </div>
    </>
}

export default BankTransferPayForm;