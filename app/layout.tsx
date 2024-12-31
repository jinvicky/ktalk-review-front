import type { Metadata } from "next";
import { TranslationProviders } from "@/components/TranslationProvider";
import "./globals.css";
import SubLayout from "./layout/subLayout";

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
          <SubLayout>{children}</SubLayout>
        </body>
      </html>
    </TranslationProviders>
  );
}
