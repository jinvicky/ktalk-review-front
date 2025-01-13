"use client";

import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

interface ChatFormProps {
    chatRoomId: string;
    onSubmitBySocket: (message: string) => void;
}

const ChatForm = ({ chatRoomId: propChatRoomId, onSubmitBySocket }: ChatFormProps) => {
    const [text, setText] = useState<string | null>("");
    const [files, setFiles] = useState<FileList | null>(null);

    const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)));
    }

    // 채팅 전송
    const onClickSubmit = async () => {
        if (!(text || files)) return;

        if (files) {
            for (const f of files) {
                const buffer = await f.arrayBuffer();
                const base64String = arrayBufferToBase64(buffer);

                const msgFile = {
                    type: "F",
                    encodingFile: base64String,
                    chatRoomId: propChatRoomId,
                    senderEmail: "wkdu0723@naver.com", // 하드코딩에서 고쳐야 함
                }
                onSubmitBySocket(JSON.stringify(msgFile));
            }
        }

        if (text) {
            const msgText = {
                type: "T",
                chatRoomId: propChatRoomId,
                senderEmail: "wkdu0723@naver.com",
                content: text,
            }
            onSubmitBySocket(JSON.stringify(msgText));
        }

        setText("");
        setFiles(null);
    }

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || files.length === 0) return;
        setFiles(files);
    }

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    return (
        <div className="flex mt-4 gap-2">
            <TextField
                label="Type a message"
                variant="outlined"
                value={text}
                onChange={onChangeText}
                className="border border-gray-300 flex-1"
            />
            <div className="flex items-center gap-2">
                <input
                    type="file"
                    onChange={onChangeFile}
                    className="hidden"
                    id="file-upload"
                    multiple
                />
                <label htmlFor="file-upload">
                    <Button
                        variant="contained"
                        component="span" // 'span'으로 파일 업로드 버튼을 감쌈
                    >
                        Upload File
                    </Button>
                </label>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClickSubmit}
                >
                    <Send />
                </Button>
            </div>
        </div>
    );
};

export default ChatForm;