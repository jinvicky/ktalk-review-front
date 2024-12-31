"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function SubLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentPath = usePathname();

    return (
        <>
            {currentPath !== "/event/payment/complete" && <NavBar />}
            {children}
            {currentPath !== "/event/payment/complete" && <Footer />}
        </>
    );
};