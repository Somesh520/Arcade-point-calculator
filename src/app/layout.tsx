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
  metadataBase: new URL("https://google-arcade-calculator-2026.vercel.app"),
  title: "Google Cloud Arcade Points Calculator 2026 | Somesh Tiwari",
  description:
    "Calculate your Google Cloud Arcade Points instantly. Track Game Badges, Trivia Badges, and Skill Badges for the 2026 Season. Join the Arcade Army!",
  keywords: [
    "Google Cloud Arcade",
    "Arcade Points Calculator",
    "Cloud Skills Boost",
    "Arcade 2026",
    "Google Arcade Swag",
    "Skill Badges",
    "Arcade Calculator",
  ],
  authors: [{ name: "Somesh Tiwari", url: "https://github.com/Somesh520" }],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.webmanifest",
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
    url: "https://google-arcade-calculator-2026.vercel.app",
    siteName: "Google Cloud Arcade Points Calculator 2026",
    locale: "en_US",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
