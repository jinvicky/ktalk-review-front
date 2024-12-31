/** 결제 진행 상태값 */
export enum PaymentState {
    None = "0",
    Request = "1", // 결제 요청
    Complete = "4", // 완료
    Cancel1 = "8", // 요청 취소 (결제X)
    Cancel2 = "16", // 요청 취소 (결제X)
    Cancel3 = "32", // 요청 취소 (결제X)
    ApprovalCancel1 = "9", // 승인 취소 (결제완료 상태에서 취소)
    ApprovalCancel2 = "64", // 승인 취소 (결제완료 상태에서 취소)
    Pending = "10", // 결제대기
    PartialCancel1 = "70", // 부분취소 (결제완료 상태에서 부분 취소)
    PartialCancel2 = "71", // 부분취소 (결제완료 상태에서 부분 취소)
}

/** 결제완료 시 프론트에서 받을 결제 데이터 */
export interface PaymentInfo {
    state: PaymentState;
    userName: string;
}
