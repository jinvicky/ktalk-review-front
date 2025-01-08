"use client";

import React, { useState } from "react";

import { useQueries, useQuery } from "@tanstack/react-query";

import { fetchChatMsgHistory, fetchChatRoomDetail } from "@/api/chatApi";

import { ChatMsg, ChatRoom as ChatRoomType } from "@/types/chat.type";

import { TextField, Button, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ChatSharp, Send } from "@mui/icons-material";

import { Loading } from "@/components/Loading";

const ChatForm = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null); // 파일 상태 관리

    const handleSendMessage = () => {
        // 메시지 전송 로직
        if (message) {
            console.log("Message:", message);
        }

        // 파일 전송 로직
        if (file) {
            console.log("File:", file);
        }

        // 메시지 및 파일 초기화
        setMessage("");
        setFile(null);
    };

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0]; // 첫 번째 파일 선택
        if (selectedFile) {
            setFile(selectedFile); // 파일 상태 업데이트
        }
    };

    return (
        <div className="flex space-x-2 mt-4">
            <TextField
                label="Type a message"
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-gray-300"
            />
            <div className="flex items-center space-x-2">
                {/* 파일 업로드 버튼 */}
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload">
                    <Button
                        variant="contained"
                        component="span" // 'span'으로 파일 업로드 버튼을 감쌈
                        className="flex items-center"
                    >
                        Upload File
                    </Button>
                </label>
                {/* 메시지 전송 버튼 */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    className="flex items-center"
                >
                    <Send />
                </Button>
            </div>
        </div>
    );
};

interface ChatRoomProps {
    chatRoomId: string;
}
const ChatRoom = ({ chatRoomId: propsChatRoomId }: ChatRoomProps) => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { user: "You", content: "Hello!" },
        { user: "Alice", content: "Hi there!" },
        { user: "You", content: "How's it going?" },
        { user: "Bob", content: "Good, thanks! How about you?" },
    ]);
    const [openDialog, setOpenDialog] = useState(false);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { user: "You", content: message }]);
            setMessage("");
        }
    };
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    // 위 코드들은 레거시로 대수정이 필요.

    const queries = useQueries({
        queries: [
            {
                queryKey: ['chatRoom', propsChatRoomId],
                queryFn: fetchChatRoomDetail,
            },
            {
                queryKey: ['chatMsgHistory', propsChatRoomId],
                queryFn: fetchChatMsgHistory,
            },
        ],
    });

    const isLoading = queries.some(query => query.isLoading);
    const error = queries.find(query => query.error instanceof Error);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>An error occurred: {error.data.error}</div>;
    }

    const chatRoomDetail = queries[0].data.data as ChatRoomType;
    const chatMsgHistory = queries[1].data.data as ChatMsg[];

    const renderChatRoomHeader = () => <div>
        <div className={"flex items-center gap-3"}>
            <Avatar
                src={"https://i.crepe.land/https://crepe.land/static/user_profile/default_profile_image.png?h=56&t=i&v=3a&w=56"}
                sx={{ width: 56, height: 56 }}
                className="flex-none border rounded-full bg-white object-cover"
            />
            <div className="flex items-center gap-1">
                <span>{chatRoomDetail.name} ({chatRoomDetail.mngId})</span>
            </div>
        </div>
    </div>

    //  TODO:: 채팅 본인 이메일 확인 여부 메서드. 추후 jwt + middleware로 변경 필요.
    const chatFromMe = (senderEmail: string) => senderEmail === "jinvicky@naver.com";

    const renderChatHistory = () => {
        const separatorUi = (ymdDate: string) => <div className="flex justify-center items-center text-gray-500">-----{ymdDate}----</div>;

        const dayPassedOrFirstChat = (prevMsg: ChatMsg, nowMsg: ChatMsg, index: number) => {
            return (index === 0 || prevMsg.formatKoreaYMD !== nowMsg.formatKoreaYMD)
        }

        return chatMsgHistory.map((msg: ChatMsg, index: number) => (
            <>
                {dayPassedOrFirstChat(chatMsgHistory[index - 1], msg, index) && separatorUi(msg.formatKoreaYMD)}
                <div
                    key={index}
                    className={`flex ${chatFromMe(msg.senderEmail) ? "justify-end" : "justify-start"}`}
                >
                    <div className={`flex items-end space-x-2 ${chatFromMe(msg.senderEmail) ? "text-right" : ""}`}>
                        <span className={`text-xs text-gray-500 ${chatFromMe(msg.senderEmail) ? "order-0" : "order-1"}`}>
                            {msg.formatHms}
                        </span>
                        <div className={`bg-gray-100 p-2 rounded-lg max-w-xs ${chatFromMe(msg.senderEmail) ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}>
                            <p className="font-semibold">{msg.nickname}</p>
                            <p>{msg.content}</p>
                        </div>
                    </div>
                </div>
            </>
        ));
    }

    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-sm p-4 h-[500px]">
            <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
                {renderChatRoomHeader()}
                {renderChatHistory()}
            </div>
            <ChatForm />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Chat Settings</DialogTitle>
                <DialogContent>
                    <TextField label="Room Name" fullWidth margin="normal" />
                    <TextField label="Your Name" fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ChatRoom;