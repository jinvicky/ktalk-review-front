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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TranslationProviders>
      <html lang="en">
        <body>
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </TranslationProviders>
  );
}
