"use client";

import ChatRoom from "@/components/chat/ChatRoom";
import ChatUser from "@/components/chat/ChatUser";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChatRoomsBySrch } from "@/api/chatApi";
import { ChatRoomData } from "@/types/chat.type";
import Loading from "@/app/loading";

/**
 * 채팅방 리스트 전체를 볼 수 있는 페이지. 채팅방에서 권한 분기 처리하려다가 그냥 페이지 분리. 
 * middleware에서 권한 확인하면 되지 않을까. 페이지 진입 시점에 하든가.
 */
const ChatAdminPage = () => {
    const [selectId, setSelectId] = useState<string>('');

    const dummyUserEmail = 'jinvicky@naver.com';
    const { data, isLoading } = useQuery({
        queryKey: ['chatRooms', dummyUserEmail],
        queryFn: fetchChatRoomsBySrch,
        staleTime: 5000
    });

    if (isLoading) return <Loading />;

    const chatRooms: ChatRoomData[] = data.data;

    if (chatRooms.length < 1) return <div>현재 채팅방이 없습니다.</div>

    return (
        <div className="flex max-w-7xl h-mainContentHeight p-5">
            {chatRooms.map((roomData: ChatRoomData, idx: number) => (
                <ChatUser
                    key={`${roomData.mngId}-${idx}`}
                    selectId={selectId}
                    chatRoomData={roomData}
                    setChatRoomId={setSelectId}
                />
            ))}
            <div className="flex flex-col w-full bg-white border-y border-r border-gray-200 rounded-sm p-4">
                {selectId && <ChatRoom chatRoomId={selectId} />}
            </div>
        </div>
    );
}

export default ChatAdminPage;