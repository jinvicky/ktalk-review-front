/**
 * 사용자 정보를 넘기면 새로운 채팅방 id 또는 기존 채팅방 id를 반환.
 * @param user 
 * @returns 
 */
export const fetchInitOrEnterChatRoom = async (user: { email: string, nickname: string }) => {
    const response = await fetch('/api/chat/init/',
        {
            body: JSON.stringify(user),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export const fetchChatRoomsBySrch = async ({ queryKey }: { queryKey: string[] }) => {
    const userEmail = queryKey[1];
    const response = await fetch('/api/chat/search/room?userEmail=' + userEmail);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/**
 * 채팅방 상세 조회
 */
export const fetchChatRoomDetail = async ({ queryKey }: { queryKey: string[] }) => {
    const chatRoomId = queryKey[1];

    const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + '/api/chat/detail/room?chatRoomId=' + chatRoomId);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

/**
 * 채팅방별 기존 채팅 이력 조회
 */
export const fetchChatMsgHistory = async ({ queryKey }: { queryKey: string[] }) => {
    const chatRoomId = queryKey[1];

    const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + '/api/chat/msg/history?chatRoomId=' + chatRoomId);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

/** 
 * 채팅방에 입장한 사용자 접속 여부 업데이트 
 */
export const fetchUpdateChatRoomUserAccess = async (chatRoomUser: {mngId: string, chatRoomId: string, userEmail: string, accessYn: string}) => {
    const response = await fetch('/api/chat/update/user/access',
        {
            body: JSON.stringify(chatRoomUser),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}