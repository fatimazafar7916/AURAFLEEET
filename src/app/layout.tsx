import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aiaura Fleets — AI staff for US car rental operators",
  description: "Aiaura is AI staff for US car rental shops with 5–50 cars. Built to never miss a booking. Replaces 8 vendors with one platform. Live in 14 days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-paper" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

