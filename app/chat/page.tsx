"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchInitOrEnterChatRoom } from "@/api/chatApi";

import ChatRoom from "@/components/chat/ChatRoom";
import Loading from "@/components/Loading";

const ChatPage = () => {

    const user = {
        email: 'wkdu0723@naver.com', 
        nickname: '최영완'
    }

    const {data, error, isLoading, isError} = useQuery({
        queryKey: ['chatRoom'],
        queryFn: () => fetchInitOrEnterChatRoom(user)
    });

    if(isLoading) return <Loading />;

    if(isError) return <div>{error.message}</div>;
    
    return (
        <div>
            <div className="flex">
                <ChatRoom chatRoomId={data.data} />
            </div>
        </div>
    )
}

export default ChatPage;
