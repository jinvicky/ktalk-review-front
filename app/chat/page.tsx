import ChatRoom from "@/components/chat/ChatRoom";
import ChatRoomList from "@/components/chat/ChatRoomList";

const ChatPage = () => {
    return (
        <div>
            <div className="flex ">
                <ChatRoomList />
                {/* <ChatRoom /> */}
            </div>
        </div>
    )
}

export default ChatPage;
