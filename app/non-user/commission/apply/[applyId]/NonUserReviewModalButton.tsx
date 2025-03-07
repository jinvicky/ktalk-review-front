"use client";

import { useState } from "react";

import { insertCommissionReview } from "@/api/commissionReviewApi";

import { UseForm, Validators } from "@/utils/validation/validationUtil";

import Modal from "@/components/Modal";
import LetterCounter from "@/components/LetterCounter";

interface NonUserReviewModalButtonProps {
    applyId: string;
}

const NonUserReviewModalButton = ({ applyId }: NonUserReviewModalButtonProps) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [contentLength, setContentLength] = useState<number>(0);

    const validationForm = {
        content: {
            value: reviewContent,
            validConditions: [Validators.notBlank(), Validators.minLength(5)],
            message: "리뷰를 최소 5자 이상 입력해 주세요",
            failure: false,
        },
        contentMaxLength: {
            value: contentLength,
            validConditions: [Validators.maxLength(2000)],
            message: "리뷰는 2000자를 초과할 수 없습니다.",
            failure: false,
        }
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

    const toggleModal = () => setModalOpen(!modalOpen);

    return <>
        <div>
            <Modal
                open={modalOpen}
                setOpen={toggleModal}
                hideButton={true}
            >
                <div className="flex flex-col">
                    <h1 className="flex justify-between items-end text-lg font-bold">
                        리뷰 등록하기
                        <LetterCounter limit={2000} letters={reviewContent} />
                    </h1>
                    <textarea
                        className="w-full h-40 border border-gray-300 rounded-lg my-4 p-3 outline-none resize-none"
                        value={reviewContent}
                        onChange={(e) => {
                            setReviewContent(e.target.value);
                            setContentLength(e.target.value.length);
                        }}
                    />
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg block line-height-0"
                            onClick={onSubmit}
                        >
                            등록하기
                        </button>
                        <button
                            className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg block line-height-0"
                            onClick={toggleModal}
                        >
                            취소하기
                        </button>
                    </div>
                </div>
            </Modal>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={toggleModal}
            >
                리뷰 작성하기
            </button>
        </div>
    </>
}

export default NonUserReviewModalButton;