"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useQueries, useQuery } from "@tanstack/react-query";

import { fetchChatMsgHistory, fetchChatRoomDetail, fetchUpdateChatRoomUserAccess } from "@/api/chatApi";

import { ChatMsg, ChatRoom as ChatRoomType } from "@/types/chat.type";

import { Avatar } from "@mui/material";

import { Loading } from "@/components/Loading";
import ChatForm from "./ChatForm";

import { chatFromMe } from "@/utils/userUtil";

interface ChatRoomProps {
    chatRoomId: string;
}
const ChatRoom = ({ chatRoomId: propsChatRoomId }: ChatRoomProps) => {

    const socket = useRef<WebSocket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);


    // 웹소켓 연결
    const connectSocket = () => {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            console.log("WebSocket is already connected.");
            return;
        }

        // JVK:: 포트번호 하드코딩 바꾸기
        socket.current = new WebSocket("ws://localhost:8080/api/chat?chatRoomId=" + propsChatRoomId);

        socket.current.onopen = () => {
            console.log("WebSocket connected");
            setIsSocketConnected(true);  // 연결 상태를 true로 설정
        };
    };

    useEffect(() => {
        connectSocket();
    }, []);

    const queries = useQueries({
        queries: [
            {
                queryKey: ['chatRoomDetail', propsChatRoomId],
                queryFn: fetchChatRoomDetail,
            },
            {
                queryKey: ['chatMsgHistory', propsChatRoomId],
                queryFn: fetchChatMsgHistory,
            },
            {
                queryKey: ['updateUserAccess', propsChatRoomId],
                queryFn: () => fetchUpdateChatRoomUserAccess({
                    mngId: "JVK",
                    chatRoomId: propsChatRoomId,
                    userEmail: "wkdu0723@naver.com", 
                    accessYn: "Y"
                }),
                enabled: isSocketConnected,  // WebSocket 연결 후에만 호출하도록 트리거 설정
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

    const renderChatHistory = () => {
        const separatorUi = (ymdDate: string) => <div className="flex justify-center items-center text-gray-500">-----{ymdDate}----</div>;

        const dayPassedOrFirstChat = (prevMsg: ChatMsg, nowMsg: ChatMsg, index: number) => {
            return (index === 0 || prevMsg.formatKoreaYMD !== nowMsg.formatKoreaYMD)
        }

        return chatMsgHistory.map((msg: ChatMsg, index: number) => (
            <div key={`${msg.mngNo}-${index}`}>
                {dayPassedOrFirstChat(chatMsgHistory[index - 1], msg, index) && separatorUi(msg.formatKoreaYMD)}
                <div
                    className={`flex ${chatFromMe(msg.senderEmail) ? "justify-end" : "justify-start"}`}
                >
                    <div className={`flex items-end space-x-2 ${chatFromMe(msg.senderEmail) ? "text-right" : ""}`}>
                        <span className={`text-xs text-gray-500 ${chatFromMe(msg.senderEmail) ? "order-0" : "order-1"}`}>
                            {msg.formatHms}
                        </span>
                        <div className={`bg-gray-100 p-2 rounded-lg max-w-xs ${chatFromMe(msg.senderEmail) ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}>
                            <p className="font-semibold">{msg.nickname}</p>
                            <p>{msg.content}</p>
                            {
                                msg.type === "F" && msg.resourceType === "image" && msg.resourceUrl && <Image src={msg.resourceUrl} alt="file" width={200} height={200} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    


    // 웹소켓으로 메세지 보내기
    const sendMessageBySocket = (jsonStrMsg: string) => {
        if (!socket.current) {
            console.error("웹소켓이 연결되어 있지 않습니다.");
            return;
        }
        socket.current?.send(jsonStrMsg);
    }


    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-sm p-4 h-[500px]">
            <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
                {renderChatRoomHeader()}
                {renderChatHistory()}
            </div>
            <ChatForm
                chatRoomId={propsChatRoomId}
                onSubmitBySocket={sendMessageBySocket}
            />
        </div>
    );
};
export default ChatRoom;