import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Hud } from "@/components/game/Hud";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeQuest — 커서의 황제가 되는 길",
  description:
    "터미널, vim, 프로그래밍 언어를 판타지 RPG로 익히는 게이미피케이션 학습 앱.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Hud />
        <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-border py-4 text-center text-xs text-muted">
          CodeQuest · localStorage 진행도 · 가상 셸 학습 환경
        </footer>
      </body>
    </html>
  );
}
