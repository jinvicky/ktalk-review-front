"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "NanumSquare, sans-serif",
    },
});

export default function SubLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentPath = usePathname();

    return (
        <>
            <ThemeProvider theme={theme}>
                {currentPath !== "/event/payment/complete" && <NavBar />}
                {children}
                {currentPath !== "/event/payment/complete" && <Footer />}
            </ThemeProvider>
        </>
    );
};