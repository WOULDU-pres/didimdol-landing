import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

// Pretendard Variable - 본문용 (40-50대 가독성 최적화)
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

// Noto Serif KR - 제목용 (신뢰감, 권위감)
const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "디딤돌 법무사 | 회생·파산 전문 상담",
  description: "무거운 짐, 함께 내려놓겠습니다. 디딤돌 법무사에서 새 출발을 도와드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${notoSerifKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
