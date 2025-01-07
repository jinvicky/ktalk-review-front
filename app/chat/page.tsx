import ChatRoom from "@/components/chat/ChatRoom";
import ChatRoomList from "@/components/chat/ChatRoomList";

const ChatPage = () => {
    return (
        <div>
            <div>Chat Page</div>
            <ChatRoom />

            <div>Admin Chat Page</div>
            <div className="flex ">
                {/* 어드민만 ChatRoomList를 보여준다. */}
                <ChatRoomList />
                <ChatRoom />
            </div>
        </div>
    )
}

export default ChatPage;
