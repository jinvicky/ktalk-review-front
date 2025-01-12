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

    socket.current = new WebSocket("ws://localhost:8080/api/chat?chatRoomId=jvk250107");

    socket.current.onopen = () => {
      console.log("WebSocket connected");
      // socket.current?.send(JSON.stringify("Hello WebSocket"));
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  // const onClickSubmit = async () => {
  //   const buffer = await fileInput.current?.files?.[0]?.arrayBuffer();
  //   if (buffer) {
  //     const uint8Array = new Uint8Array(buffer);
  //     if (socket.current?.readyState === WebSocket.OPEN) {

  //       //1.  Uint8Array를 Base64로 인코딩
  //       const base64EncodedFile = new TextDecoder().decode(uint8Array);
  //       const encodedFile = btoa(base64EncodedFile);  // 또는 이를 다른 방식으로 인코딩


  //       /**
  //        * 2. 아직 테스트는 안해봤는데 이것도 있대대
  //        * 
  //        * btoa(String.fromCharCode.apply(null, Array.from(uint8Array)))
  //        */

  //       const msgObj = {
  //         type: "F",
  //         encodingFile: encodedFile,
  //         chatRoomId: "jvk250107",
  //         senderEmail: "jinvicky@naver.com", 
  //         content: textInput.current?.value,
  //       }
  //       // {
  //       //   "mngNo": 1,
  //       //     "chatRoomId": "room123",
  //       //       "senderEmail": "jinvicky.com",
  //       //         "content": "안녕하세요 화요일 걍진입니다",
  //       //           "type": "T",
  //       //             "rgtrDate": "2025-01-06",
  //       //               "rgtrTime": "14:46:50",
  //       //                 "cloudName": "myCloud",
  //       //                   "resourceType": "image",
  //       //                     "publicId": "file123",
  //       //                       "format": "jpg"
  //       // }
  //       socket.current?.send(JSON.stringify(msgObj));
  //     }
  //   }
  // };

  const arrayBufferToBase64Legacy = (buffer: ArrayBuffer) => {
    const uint8Array = new Uint8Array(buffer);
    let binary = '';

    uint8Array.forEach(byte => {
      binary += String.fromCharCode(byte);
    });

    return window.btoa(binary);  // Base64로 변환
  }

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  const onClickSubmit = async () => {
    if (fileInput.current && fileInput.current.files && fileInput.current.files.length > 0) {
      const file = fileInput.current.files[0];
      // 파일을 읽어서 ArrayBuffer로 변환
      const buffer = await file.arrayBuffer();

      // ArrayBuffer를 Base64로 인코딩
      const base64String = arrayBufferToBase64(buffer);

      // JSON으로 서버에 전송할 데이터 생성
      const msgObj = {
        // encodingFile: base64String,
        chatRoomId: "jvk250107",
        senderEmail: "jinvicky@naver.com",
        content: "텍스트 내용을 담습니다.", 
        type: "A",
      };

      // 서버로 메시지 전송
      socket.current?.send(JSON.stringify(msgObj));
    }
  }

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
