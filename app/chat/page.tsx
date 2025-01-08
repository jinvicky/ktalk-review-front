"use client";

import { useState } from "react";

import ChatRoom from "@/components/chat/ChatRoom";
import ChatRoomList from "@/components/chat/ChatRoomList";

const ChatPage = () => {

    const [chatRoomId, setChatRoomId] = useState<string>('');

    return (
        <div>
            <div className="flex">
                <ChatRoomList
                    chatRoomId={chatRoomId}
                    setChatRoomId={setChatRoomId}
                />
                {/* <ChatRoom /> */}
            </div>
        </div>
    )
}

export default ChatPage;
