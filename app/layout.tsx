import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email Reply Generator",
  description: "AI-powered email reply generator using Google Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
