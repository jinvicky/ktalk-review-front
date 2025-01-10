export const fetchChatRoomsBySrchLegacy = async (userEmail: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + '/api/chat/search/room?userEmail=' + userEmail);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const fetchChatRoomsBySrch = async ({ queryKey }: { queryKey: string[] }) => {

    const userEmail = queryKey[1];

    // const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + '/api/chat/search/room?userEmail=' + userEmail);
    const response = await fetch('/chat/search/room?userEmail=' + userEmail);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/**
 * 채팅방 상세 조회
 */
export const fetchChatRoomDetail = async({queryKey}: {queryKey: string[]}) => {
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
export const fetchChatMsgHistory = async({queryKey}: {queryKey: string[]}) => {
    const chatRoomId = queryKey[1];

    const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN_URL + '/api/chat/msg/history?chatRoomId=' + chatRoomId);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}