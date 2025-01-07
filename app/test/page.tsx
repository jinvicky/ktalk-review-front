"use client";

import { useRef } from "react";

const Test = () => {
  const socket = useRef<WebSocket | null>(null); // WebSocket 연결을 useRef로 관리
  const fileInput = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLInputElement>(null);

  // WebSocket 연결 및 초기화
  const connectSocket = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      console.log("WebSocket is already connected.");
      return;  // 이미 연결된 경우 연결을 재시도하지 않음
    }
  
    socket.current = new WebSocket("ws://localhost:8080/api/chat");
  
    socket.current.onopen = () => {
      console.log("WebSocket connected");
      socket.current?.send(JSON.stringify("Hello WebSocket"));
    };
  
    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };
  const onClickSubmit = async () => {
    const buffer = await fileInput.current?.files?.[0]?.arrayBuffer();
    if (buffer) {
      const uint8Array = new Uint8Array(buffer);
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.current?.send(uint8Array);
      }
    }
  };

  return (
    <>
      <div>WebSocket Test</div>
      <input type="file" multiple ref={fileInput} />
      <input type="text" placeholder="Message" ref={textInput} />
      <button onClick={onClickSubmit}>Upload Files</button>
      <button onClick={connectSocket}>Connect WebSocket</button>{" "}
      {/* WebSocket 연결 버튼 */}
    </>
  );
};

export default Test;
