import ChatRoom from "@/components/chat/ChatRoom";
import ChatRoomList from "@/components/chat/ChatRoomList";
import { useState } from "react";

/**
 * 채팅방 리스트 전체를 볼 수 있는 페이지. 채팅방에서 권한 분기 처리하려다가 그냥 페이지 분리. 
 * middleware에서 권한 확인하면 되지 않을까. 페이지 진입 시점에 하든가.
 * 
 */
const ChatAdminPage = () => {
    const [chatRoomId, setChatRoomId] = useState<string>('');

    return (
        <div>
            <h1>Chat Admin Page</h1>
            <div>
                <div className="flex">
                    <ChatRoomList
                        chatRoomId={chatRoomId}
                        setChatRoomId={setChatRoomId}
                    />
                    {
                        chatRoomId && (
                            <ChatRoom
                                chatRoomId={chatRoomId}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}