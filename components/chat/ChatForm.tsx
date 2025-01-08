"use client";

import { useState } from "react";

import { Button, TextField } from "@mui/material";
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
                    multiple
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

export default ChatForm;