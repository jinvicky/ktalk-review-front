import type { Metadata } from "next";

import { TranslationProviders } from "@/components/TranslationProvider";
import NavBar from "@/components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "jinvicky's ktalk-review",
  description: "jinvicky's commission review page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TranslationProviders>
      <html lang="en">
        <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavBar />
          {children}
        </body>
      </html>
    </TranslationProviders>
  );
}
