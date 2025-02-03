"use client";

import React from 'react';
import { useTranslation } from "react-i18next";

import { twMerge } from 'tailwind-merge';

const Footer = () => {
    const { i18n } = useTranslation();
    type Language = "en" | "ja" | "ko";
    const languages: Language[] = ["en", "ja", "ko"];

    return (
        <footer className="bg-gray-200 py-5">
            <div className="container mx-auto text-center">
                <p className="mb-2">© {new Date().getFullYear()} jinvicky. All rights reserved.</p>
                <div className="flex justify-center">
                    {
                        languages.map((lng: Language) => (
                            <div
                                key={lng}
                                className={twMerge(
                                    i18n.language === lng 
                                    ? "text-blue-500"
                                    : "text-gray-600",
                                    "px-4 py-2 cursor-pointer"
                                )}
                                onClick={() => i18n.changeLanguage(lng)}
                            >
                                {lng.toUpperCase()}
                            </div>
                        ))
                    }
                </div>
            </div>
        </footer>
    );
};

export default Footer;