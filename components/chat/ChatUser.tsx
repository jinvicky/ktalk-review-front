"use client";


import { ChatRoomData } from "@/types/chat.type";
import { Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { twMerge } from "tailwind-merge";

const useStyles = makeStyles(() => ({
  chatMessage: {
    width: "100%",
    height: "85px",
    display: "flex",
    alignItems: "start",
    gap: "1rem",
    padding: "1rem",
    overflow: "hidden",
  },
  timestamp: {
    fontSize: "0.75rem",
    color: "#A0A0A0",
    minWidth: "max-content",
  },
  textMessage: {
    fontSize: "0.75rem",
    color: "#6B7280",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "165px",
  },
  username: {
    fontSize: "0.875rem", // Tailwind Text-Sm
    fontWeight: "500",
  },
}));

interface ChatRoomListProps {
  selectId: string;
  chatRoomData: ChatRoomData;
  setChatRoomId: (value: string) => void;
}
const ChatUser = ({
  selectId,
  chatRoomData,
  setChatRoomId: setPropsChatRoomId
}: ChatRoomListProps) => {
  const classes = useStyles();

  const { mngId, name, ltsChatMsg, timeDiffFromNow, absentMsgCnt } = chatRoomData;

  return (
    <div className="w-80 border">
      <div
        className={twMerge("flex items-center justify-start", mngId === selectId ? "" : "bg-gray-100")}
        onClick={() => setPropsChatRoomId(mngId)}
      >
        <div className={classes.chatMessage}>
          <Avatar
            alt={name}
            src={"https://i.crepe.land/https://crepe.land/static/user_profile/default_profile_image.png?h=56&t=i&v=3a&w=56"}
            sx={{ width: 56, height: 56 }}
            className="flex-none border rounded-full bg-white object-cover"
          />
          <div className="flex w-full justify-between self-center">
            <div className={"flex flex-col justify-center h-full gap-1"}>
              <span className={classes.username}>{name}</span>
              <span className={classes.textMessage}>{ltsChatMsg}</span>
            </div>
            <div className="flex flex-col justify-center h-full gap-1 items-end">
              <span className={classes.timestamp}>{timeDiffFromNow}</span>
              {absentMsgCnt > 0 && <div className="flex justify-center items-center w-5 h-5 bg-red-500 rounded-full text-white text-sm">
                {absentMsgCnt}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
