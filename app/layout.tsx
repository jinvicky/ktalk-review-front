import type { Metadata } from "next";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TranslationProviders } from "@/components/TranslationProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Jinvicky's Commission",
  description: "jinvicky's commission",
};

export default function RootLayout({
  children,
  excludeNavBarFooter = false, // NavBar와 Footer를 제외할지 여부
}: Readonly<{
  children: React.ReactNode;
  excludeNavBarFooter?: boolean
}>) {
  return (
    <TranslationProviders>
      <html lang="en">
        <body>
          {!excludeNavBarFooter && <NavBar />}
          {children}
          {!excludeNavBarFooter && <Footer />}
        </body>
      </html>
    </TranslationProviders>
  );
}
