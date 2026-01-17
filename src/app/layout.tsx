import type { Metadata, Viewport } from "next";
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
  title: {
    default: "Arcade Calculator 2026 by Somesh Tiwari | Google Cloud Points",
    template: "%s | Arcade Calculator 2026",
  },
  description:
    "The #1 Arcade Calculator for 2026 Season by Somesh Tiwari. Calculate your Google Cloud Arcade Points, track badges, and join the Arcade Army.",
  keywords: [
    "Arcade Calculator",
    "Somesh Tiwari",
    "Google Cloud Arcade",
    "Arcade Points Calculator",
    "Cloud Skills Boost",
    "Arcade 2026",
    "Google Arcade Swag",
    "Skill Badges",
  ],
  authors: [{ name: "Somesh Tiwari", url: "https://github.com/Somesh520" }],
  creator: "Somesh Tiwari",
  publisher: "Somesh Tiwari",
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
  openGraph: {
    title: "Arcade Calculator 2026 by Somesh Tiwari",
    description: "Check your progress for the Google Cloud Arcade 2026 Season. Developed by Somesh Tiwari.",
    type: "website",
    url: "https://google-arcade-calculator-2026.vercel.app",
    siteName: "Arcade Calculator 2026",
    locale: "en_US",
    images: [
      {
        url: "/icon.png", // Start with icon, maybe user wants a specific OG image later
        width: 1200,
        height: 630,
        alt: "Arcade Calculator 2026 by Somesh Tiwari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcade Calculator 2026 by Somesh Tiwari",
    description: "Track your Google Cloud Arcade Points instantly.",
    creator: "@SomeshTiwari", // Assuming handle, beneficial even if generic
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming for app-like feel
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
