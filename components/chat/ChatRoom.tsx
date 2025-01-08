"use client";

import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { fetchChatRoomDetail } from "@/api/chatApi";

import { ChatRoom as ChatRoomType } from "@/types/chat.type";

import { TextField, Button, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Send } from "@mui/icons-material";

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

    const { data, error, isLoading } = useQuery({
        queryKey: ['chatRoom', propsChatRoomId],
        queryFn: fetchChatRoomDetail,
        staleTime: 5000
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>An error occurred: {error.message}</div>;
    }

    console.log(data);
    const chatRoomDetail = data.data as ChatRoomType;

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

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

    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-sm p-4 h-[500px]">
            <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
                {renderChatRoomHeader()}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex items-center space-x-2 ${msg.user === "You" ? "text-right" : ""}`}>
                            <div className={`bg-gray-100 p-2 rounded-lg max-w-xs ${msg.user === "You" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}>
                                <p className="font-semibold">{msg.user}</p>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
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