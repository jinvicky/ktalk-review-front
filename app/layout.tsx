import type { Metadata } from "next";

import ReactQueryProviders from "@/components/ReactQueryProviders";
import { AlertProvider } from "@/components/alert/alertProvider";
import { TranslationProviders } from "@/components/TranslationProvider";

import SubLayout from "./layout/subLayout";

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
          <div>
            <ReactQueryProviders>
              <AlertProvider>
                <SubLayout>{children}</SubLayout>
              </AlertProvider>
            </ReactQueryProviders>
          </div>
        </body>
      </html>
    </TranslationProviders>
  );
}
