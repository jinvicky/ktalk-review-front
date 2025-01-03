"use client";

import { useRef } from "react";

const Test = () => {
  const socket = useRef<WebSocket | null>(null); // WebSocket 연결을 useRef로 관리
  const fileInput = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLInputElement>(null);

  // WebSocket 연결 및 초기화
  const connectSocket = () => {
    socket.current = new WebSocket('ws://localhost:8080/chat');

    socket.current.onopen = () => {
      console.log('WebSocket connected');
      socket.current?.send(JSON.stringify('Hello WebSocket'));
    };
  };

  const onClickSubmit = async () => {
    const array = new Uint8Array(21419).map((v, i) => i); // 512일 때는 요청이 들어가다가 21419로 파일 사이즈만큼 늘렸더니 안된다. 
    // 결론. byte[]로 바꾸는 건 잘했는데 용량이 너무 커서 요청이 받아들여지지 않은 것임.

    const buffer = await fileInput.current?.files?.[0]?.arrayBuffer();
    if (buffer) {
      const t1 = new Uint8Array(buffer);

      console.log('imageByteData:', t1.slice(0, 512));
      
      if (socket.current?.readyState === WebSocket.OPEN) {
        // socket.current?.send(textInput.current?.value || 'text field');
        socket.current?.send(t1.slice(0, 512)); // ok 
        // socket.current?.send(t1.buffer); // can not receive
      }
    }
  
  };

  return (
    <>
      <div>WebSocket Test</div>
      <input type="file" multiple ref={fileInput} />
      <input type="text" placeholder="Message" ref={textInput} />
      <button onClick={onClickSubmit}>Upload Files</button>
      <button onClick={connectSocket}>Connect WebSocket</button> {/* WebSocket 연결 버튼 */}
    </>
  );
};

export default Test;
