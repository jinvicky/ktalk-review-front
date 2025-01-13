"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchInitOrEnterChatRoom } from "@/api/chatApi";
import ChatRoom from "@/components/chat/ChatRoom";
import DataLoading from "@/components/DataLoading";

const ChatPage = () => {
    const user = {
        email: 'wkdu0723@naver.com',
        nickname: '최영완'
    }

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['chatRoom'],
        queryFn: () => fetchInitOrEnterChatRoom(user)
    });

    if (isLoading) return <DataLoading />;
    if (isError) return <div>{error.message}</div>;

    return (
        <div className="flex justify-center p-5 h-mainContentHeight">
            <ChatRoom chatRoomId={data.data} />
        </div>
    )
}

export default ChatPage;
