interface ApplyFile {
    id: string | null;
    applyId: string | null;
    resourceType: string;
    publicId: string;
    format: string;
    rgtrDt: string | null;
    cloudName: string;
    fileUrl: string;
}

interface CommissionApply {
    userName: string;
    userEmail: string;
    nicknameYn: string;
    nickname: string | null;
    sendEmailYn: string;
    sendEmail: string | null;
    content: string;
    status: string;
    memberYn: string;
    applyFileList: ApplyFile[];
}
