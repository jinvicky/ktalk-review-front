import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    important: "body",
    corePlugins: {
        preflight: true,
    },
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            height: {
                mainContentHeight: "calc(100vh - 64px)", // 사용자 정의 클래스 추가
            },
        },
    },
    plugins: [],
};
export default config;
