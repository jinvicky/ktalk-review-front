"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchChatRoomsBySrch } from "@/api/chatApi";

import { Avatar, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { twMerge } from "tailwind-merge";

const useStyles = makeStyles(() => ({
  chatMessage: {
    height: "85px",
    display: "flex",
    alignItems: "start",
    gap: "1rem",
    padding: "1rem",
    overflow: "hidden",
  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  timestamp: {
    fontSize: "0.75rem",
    color: "#A0A0A0",
    minWidth: "max-content",
  },
  textMessage: {
    fontSize: "0.75rem",
    color: "#6B7280", // Tailwind Gray 500
    whiteSpace: "normal",
  },
  username: {
    fontSize: "0.875rem", // Tailwind Text-Sm
    fontWeight: "500",
  },
}));

interface ChatRoom {
  mngId: string;
  name: string;
  ltsSenderEmail: string;
  ltsChatMsg: string;
  ltsChatTime: string;
  timeDiffFromNow: string;
}

interface ChatRoomListProps {
  chatRoomId: string;
  setChatRoomId: (value: string) => void;
}
const ChatRoomList = ({
  chatRoomId: propsChatRoomId,
  setChatRoomId: setPropsChatRoomId
}: ChatRoomListProps) => {
  const classes = useStyles();

  const dummyUserEmail = 'jinvicky@naver.com';

  const { data, error, isLoading } = useQuery({
    queryKey: ['chatRooms', dummyUserEmail],
    queryFn: fetchChatRoomsBySrch,
    staleTime: 5000
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>An error occurred: {error.message}</div>;
  }

  const chatRooms: ChatRoom[] = data.data;

  if (chatRooms.length < 1) {
    return <div>
      현재 채팅방이 없습니다.
    </div>;
  }

  return (
    <div className="space-y-4">
      {chatRooms.map((msg: ChatRoom, index: number) => (
        <div 
            key={index} 
            className={twMerge("flex items-center justify-start", msg.mngId === propsChatRoomId ? "bg-gray-100" : "")}
            onClick={() => setPropsChatRoomId(msg.mngId)}
        >
          <div className={classes.chatMessage}>
            <Avatar
              alt={msg.name}
              src={"https://i.crepe.land/https://crepe.land/static/user_profile/default_profile_image.png?h=56&t=i&v=3a&w=56"}
              sx={{ width: 56, height: 56 }}
              className="flex-none border rounded-full bg-white object-cover"
            />
            <div className={classes.messageContent}>
              <div className="flex items-center gap-1">
                <span className={classes.username}>{msg.name}</span>
              </div>
              <div className={classes.textMessage}>{msg.ltsChatMsg}</div>
            </div>
            <div className={classes.timestamp}>{msg.timeDiffFromNow}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
