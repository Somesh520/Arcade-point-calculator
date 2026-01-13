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
  title: "Google Cloud Arcade Points Calculator 2026 | Somesh Tiwari",
  description: "Calculate your Google Cloud Arcade Points instantly. Track Game Badges, Trivia Badges, and Skill Badges for the 2026 Season. Join the Arcade Army!",
  keywords: ["Google Cloud Arcade", "Arcade Points Calculator", "Cloud Skills Boost", "Arcade 2026", "Google Arcade Swag", "Skill Badges", "Arcade Calculator"],
  authors: [{ name: "Somesh Tiwari", url: "https://github.com/Somesh520" }],
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Arcade Calc",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevents zooming for app-like feel
  },
  openGraph: {
    title: "Arcade Points Calculator 2026",
    description: "Check your progress for the Google Cloud Arcade 2026 Season.",
    type: "website",
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
