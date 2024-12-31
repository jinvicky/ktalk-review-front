import type { Metadata } from "next";
import { TranslationProviders } from "@/components/TranslationProvider";
import "./globals.css";
import SubLayout from "./layout/subLayout";
import { AlertProvider } from "@/components/alert/alertProvider";

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
          <AlertProvider>
            <SubLayout>{children}</SubLayout>
          </AlertProvider>
        </body>
      </html>
    </TranslationProviders>
  );
}
