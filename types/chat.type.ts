export interface ChatRoomData {
    mngId: string;
    name: string;
    ltsSenderEmail: string;
    ltsChatMsg: string;
    ltsChatTime: string;
    timeDiffFromNow: string;
    absentMsgCnt: number;
}

export interface ChatMsg {
    mngNo: number;
    chatRoomId: string;
    nickname: string;
    senderEmail: string;
    content: string;
    type: 'T' | 'F';
    rgtrDate: number[];
    rgtrTime: number[];
    formatKoreaYMD: string;
    formatHms: string;

    /** 
     type='F'일 때만 사용
     **/
    cloudName?: string;
    resourceType?: 'image' | 'raw';
    publicId?: string;
    format?: string;
    resourceUrl?: string;
};