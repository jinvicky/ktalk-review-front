"use client";

import React, { useState } from "react";
import { TextField, Button, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Send } from "@mui/icons-material";

const ChatRoom = () => {
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

    return (
        <div className="flex flex-col max-w-lg mx-auto my-10 bg-white shadow-lg rounded-lg p-4 h-[500px]">
            <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex items-center space-x-2 ${msg.user === "You" ? "text-right" : ""}`}>
                            {/* <Avatar>{msg.user[0]}</Avatar> */}
                            <div className={`bg-gray-100 p-2 rounded-lg max-w-xs ${msg.user === "You" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}>
                                <p className="font-semibold">{msg.user}</p>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex space-x-2 mt-4">
                <TextField
                    label="Type a message"
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-300"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    className="flex items-center"
                >
                    <Send />
                </Button>
            </div>

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