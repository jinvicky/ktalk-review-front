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
    id: string;
    userName: string;
    userEmail: string;
    nicknameYn: string;
    nickname: string | null;
    sendEmailYn: string;
    sendEmail: string | null;
    title: string;
    content: string;
    status: string;
    memberYn: string;
    rgtrDt: string;
    applyFileList: ApplyFile[];
}

interface CommissionApplyRegForm {
    id?: string;
    userName: string;
    userEmail: string;
    nicknameYn: string;  
    nickname?: string;    
    sendEmailYn: string; 
    sendEmail?: string;  
    content: string;
    files?: File[];   
    status?: string;      
    memberYn?: string;
  }
  