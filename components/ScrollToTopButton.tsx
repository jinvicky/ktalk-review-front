"use client";

import { useEffect, useState } from "react";

import NorthIcon from '@mui/icons-material/North';

const ScrollToTopButton = () => {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        const handleShowButton = () => {
            setDisplay(window.scrollY > 150 ? true : false);
        }

        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, []);

    if(!display) return <></>;

    return <div className="fixed bottom-5 right-5 z-50 p-3 bg-white rounded-full border border-gray-300">
        <button
            onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        >
            <NorthIcon />
        </button>
    </div>
}

export default ScrollToTopButton;