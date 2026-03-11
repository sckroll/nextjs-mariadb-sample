import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReadLog - 내 손안의 독서 기록",
  description: "개인 독서 활동을 관리하고 추적하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}