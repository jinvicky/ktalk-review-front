import type { Metadata } from "next";

import { TranslationProviders } from "@/components/TranslationProvider";

import "./globals.css";
import { headers } from "next/headers";
import i18next from "i18next";

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
          {children}
        </body>
      </html>
    </TranslationProviders>
  );
}
