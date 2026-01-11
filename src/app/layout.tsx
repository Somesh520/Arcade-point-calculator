import type { Metadata } from "next";
// eslint-disable-next-line @next/next/no-page-custom-font
import { Press_Start_2P, Outfit } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ArcadeCalc Clone",
  description: "Calculate your Google Cloud Arcade Points",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${outfit.variable} antialiased bg-[var(--background)] text-white min-h-screen relative`}
      >
        <div className="scanlines"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
