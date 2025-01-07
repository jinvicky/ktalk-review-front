"use client";

import { Avatar, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

const ChatRoomList = () => {
  const classes = useStyles();

  const messages = [
    {
      user: "밍이",
      message: "아 넵 감사합니다!!!",
      time: "10:46",
      avatar: "https://i.crepe.land/https://crepe.land/static/user_profile/default_profile_image.png?h=56&t=i&v=3a&w=56",
      verified: true,
    },
    {
      user: "밍이2",
      message: "아 넵 감사합니다!!!",
      time: "10:46",
      avatar: "https://i.crepe.land/https://crepe.land/static/user_profile/default_profile_image.png?h=56&t=i&v=3a&w=56",
      verified: true,
    },
    // Add other message objects here.
  ];

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <div key={index} className="flex items-center justify-start">
          <div className={classes.chatMessage}>
            <Avatar
              alt={msg.user}
              src={msg.avatar}
              sx={{ width: 56, height: 56 }}
              className="flex-none border rounded-full bg-white object-cover"
            />
            <div className={classes.messageContent}>
              <div className="flex items-center gap-1">
                <span className={classes.username}>{msg.user}</span>
                {msg.verified && (
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={<span className="text-xs text-blue-500">✔</span>}
                    sx={{ width: "16px", height: "16px" }}
                  />
                )}
              </div>
              <div className={classes.textMessage}>{msg.message}</div>
            </div>
            <div className={classes.timestamp}>{msg.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
