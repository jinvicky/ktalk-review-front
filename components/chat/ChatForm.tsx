"use client";

import { useRef, useState } from "react";

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
        if (files) { // 파일이 있다.
            for(const f of files) {
                const buffer = await f.arrayBuffer();
                const base64String = arrayBufferToBase64(buffer);

                const msgFile =  {
                    type: "F",
                    encodingFile: base64String,
                    chatRoomId: propChatRoomId,
                    senderEmail: "wkdu0723@naver.com", // 하드코딩에서 고쳐야 함
                }
                onSubmitBySocket(JSON.stringify(msgFile));
            }
        }

        // text를 보낸다. 
        if(!text) {
            return;
            // JVK:: 텍스트를 입력해주세요 처리. 가능하면 button disabled 사전에 하고 이것도 추가 (백엔드도 빈 텍스트는 insert 막을 예정)
        }

        const msgText =  {
            type: "T", 
            chatRoomId: propChatRoomId,
            senderEmail: "wkdu0723@naver.com", 
            content: text,
        }
        onSubmitBySocket(JSON.stringify(msgText));

        console.log('직렬화', JSON.stringify(msgText));

        setText("");
        setFiles(null);

        // alert('Message sent');
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
        <div className="flex space-x-2 mt-4">
            <TextField
                label="Type a message"
                variant="outlined"
                fullWidth
                value={text}
                onChange={onChangeText}
                className="border border-gray-300"
            />
            <div className="flex items-center space-x-2">
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
                        className="flex items-center"
                    >
                        Upload File
                    </Button>
                </label>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClickSubmit}
                    className="flex items-center"
                >
                    <Send />
                </Button>
            </div>
        </div>
    );
};

export default ChatForm;