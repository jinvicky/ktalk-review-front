import type { Metadata } from "next";
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
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
