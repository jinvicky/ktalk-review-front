"use client";
import { isSignedIn } from "@/api/userApi";
import { useEffect } from "react";

import CryptoJS from 'crypto-js';


const Test3Page = () => {

    const secretKey = 'your-secret-key';

    // 이메일 암호화 함수
    function encryptEmail() {
        // 이메일을 AES 알고리즘으로 암호화
        const ciphertext = CryptoJS.AES.encrypt("jinvicky@naver.com", secretKey).toString();
        return ciphertext;
    }

    // 이메일을 로컬스토리지에 저장
    function storeEmailInLocalStorage() {
        const encryptedEmail = encryptEmail();
        localStorage.setItem('userEmail', encryptedEmail);
    }

    // 이메일 복호화 함수
    function decryptEmail(encryptedEmail: string) {
        const bytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
        const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedEmail;
    }

    // 로컬스토리지에서 이메일 가져오기 및 복호화
    function getEmailFromLocalStorage() {
        const encryptedEmail = localStorage.getItem('userEmail');
        if (encryptedEmail) {
            return decryptEmail(encryptedEmail);
        } else {
            return null; // 이메일이 없는 경우
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            const resp = await isSignedIn();

            encryptEmail()
            storeEmailInLocalStorage();


            // ok
            decryptEmail('U2FsdGVkX18Z291uPM/KpmsL0CpQM/fYlYEs0ZuhKRvmL5/cyGmcrQdoLgXzOnGW');
        };

        fetchData();

        return () => {
        };
    }, [])


    return <div>Test 3 Page</div>;
}

export default Test3Page;