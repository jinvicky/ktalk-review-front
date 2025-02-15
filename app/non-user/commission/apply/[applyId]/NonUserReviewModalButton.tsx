"use client";

import { useState } from "react";

import { insertCommissionReview } from "@/api/commissionReviewApi";

import Modal from "@/components/Modal";
import { TextField } from "@mui/material";
import { UseForm, Validators } from "@/utils/validation/validationUtil";

interface NonUserReviewModalButtonProps {
    applyId: string;
}

const NonUserReviewModalButton = ({ applyId }: NonUserReviewModalButtonProps) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [reviewContent, setReviewContent] = useState<string>("");

    const validationForm = {
        content: {
            value: reviewContent,
            validConditions: [Validators.notBlank(), Validators.minLength(5)],
            message: "리뷰를 최소 5자 이상 입력해 주세요",
            failure: false,
        },
    };

    const onSubmit = async () => {
        const { isValid, message } = UseForm(validationForm);

        if (!isValid) {
            alert(message);
            return;
        }
        const resp = await insertCommissionReview({ applyId: applyId, content: reviewContent }) as ApiResult<number>;

        if (resp.status === "200") {
            alert("리뷰가 등록되었습니다.");
            setModalOpen(false);

            window.location.reload();
        }
    }

    return <>
        <div>
            <Modal
                open={modalOpen}
                setOpen={() => setModalOpen(!modalOpen)}
                hideButton={true}
            >
                <div>
                    <h1 className="text-lg font-bold">리뷰 등록하기</h1>
                    <TextField
                        label="리뷰 내용"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        minRows={5}
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white mt-3 px-4 py-2 rounded-lg block mx-auto"
                        onClick={onSubmit}
                    >
                        등록하기
                    </button>
                </div>
            </Modal>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setModalOpen(!modalOpen)}
            >
                리뷰 작성하기
            </button>
        </div>
    </>
}

export default NonUserReviewModalButton;