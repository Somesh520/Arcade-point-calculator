"use client";

import { useState, useEffect } from "react";
import { Search, Trash2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SavedProfile {
  name: string;
  avatar: string;
  url: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("arcadeProfiles");
    if (stored) {
      setSavedProfiles(JSON.parse(stored));
    }
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    router.push(`/dashboard?url=${encodeURIComponent(url)}`);
  };

  const handleProfileClick = (profileUrl: string) => {
    router.push(`/dashboard?url=${encodeURIComponent(profileUrl)}`);
  };

  const removeProfile = (e: React.MouseEvent, profileUrl: string) => {
    e.stopPropagation();
    const updated = savedProfiles.filter(p => p.url !== profileUrl);
    setSavedProfiles(updated);
    localStorage.setItem("arcadeProfiles", JSON.stringify(updated));
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-12 font-[family-name:var(--font-outfit)]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-3xl flex flex-col items-center"
      >
        <h1 className="text-3xl md:text-5xl font-[family-name:var(--font-press-start)] mb-6 neon-text-pink leading-normal py-4">
          2026 ARCADE CALCULATOR
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Track your Google Cloud Arcade progress, calculate points, and verify milestones.
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <form onSubmit={handleCalculate} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              placeholder="Paste your Google Cloud Public Profile URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl arcade-input text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--color-neon-pink)] hover:bg-fuchsia-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_15px_var(--color-neon-pink)] font-[family-name:var(--font-press-start)] text-xs md:text-sm"
          >
            CALCULATE
          </button>
        </form>

        {/* Saved Accounts Section */}
        {savedProfiles.length > 0 && (
          <div className="mb-12">
            <h3 className="text-[var(--color-neon-cyan)] font-[family-name:var(--font-press-start)] mb-4 text-sm">SAVED ACCOUNTS</h3>
            <div className="grid gap-3">
              {savedProfiles.map((profile, i) => (
                <div
                  key={i}
                  onClick={() => handleProfileClick(profile.url)}
                  className="arcade-card p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={profile.avatar || "https://cdn.qwiklabs.com/google_standard_32.svg"} alt="Avatar" className="w-10 h-10 rounded-full border border-[var(--color-neon-cyan)]" />
                  <span className="font-bold">{profile.name}</span>
                  <button
                    onClick={(e) => removeProfile(e, profile.url)}
                    className="ml-auto text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                    title="Remove Account"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* WhatsApp Community Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-2xl mt-8 text-center"
      >
        <div className="p-1 rounded-2xl bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-blue)]">
          <a
            href="https://chat.whatsapp.com/FzBoBgLwRTlGpstxxSSB8F"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black hover:bg-black/80 text-white font-bold py-6 px-8 rounded-xl transition-all font-[family-name:var(--font-press-start)] text-sm md:text-base flex items-center justify-center gap-4 group"
          >
            <span className="text-[var(--color-neon-green)] animate-pulse">JOIN ARCADE ARMY</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>
        <p className="mt-4 text-gray-400 text-sm">Join our WhatsApp community for daily game updates & solutions!</p>
      </motion.div>

      {/* Guide Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-4xl mt-20 space-y-12"
      >
        {/* Full Guide Banner */}
        <div className="text-center mb-16">
          <Link href="/guide">
            <button className="pixel-button bg-[var(--color-neon-yellow)] text-black px-6 py-4 rounded font-bold hover:scale-105 transition-transform flex items-center gap-3 mx-auto animate-pulse shadow-[0_0_20px_var(--color-neon-yellow)]">
              <BookOpen size={24} /> READ OFFICIAL 2026 GUIDE
            </button>
          </Link>
          <p className="mt-4 text-gray-400 text-sm font-[family-name:var(--font-outfit)]">
            Everything you need to know: Rules, Dates & Points System
          </p>
        </div>

        {/* What is Arcade? */}
        <section>
          <h2 className="text-2xl font-[family-name:var(--font-press-start)] mb-6 text-[var(--color-neon-cyan)]">
            <span className="text-white">01.</span> WHAT IS GOOGLE ARCADE?
          </h2>
          <div className="arcade-card p-6 rounded-xl text-gray-300 leading-relaxed">
            <p>
              **Google Cloud Arcade** is a gamified learning program where valid **Google Cloud Skills Boost** users can learn cloud skills for free.
            </p>
            <p className="mt-4">
              By completing &quot;Labs&quot; and &quot;Games&quot;, you earn **Badges**. These badges translate into **Arcade Points**, which can be redeemed for **exclusive swag** (T-shirts, Backpacks, Mugs, etc.) at the &quot;Prize Counter&quot; which opens twice a year (June & December).
            </p>
          </div>
        </section>

        {/* How to Register */}
        <section>
          <h2 className="text-2xl font-[family-name:var(--font-press-start)] mb-6 text-[var(--color-neon-pink)]">
            <span className="text-white">02.</span> HOW TO REGISTER?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Create Account", desc: "Sign up on cloudskillsboost.google with your Gmail." },
              { title: "Subscribe", desc: "Activate the Arcade subscription (it's free!) via the email updates page." },
              { title: "Make Public", desc: "Ensure your profile is set to PUBLIC so we can track your points." }
            ].map((step, i) => (
              <div key={i} className="arcade-card p-6 rounded-xl border-t-2 border-[var(--color-neon-pink)]">
                <h3 className="font-bold text-white mb-2">{i + 1}. {step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Play */}
        <section>
          <h2 className="text-2xl font-[family-name:var(--font-press-start)] mb-6 text-[var(--color-neon-green)]">
            <span className="text-white">03.</span> HOW TO PLAY?
          </h2>
          <div className="arcade-card p-6 rounded-xl space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--color-neon-green)] text-black font-bold px-3 py-1 rounded">GAME</div>
              <div>
                <h4 className="font-bold text-white">Daily & Monthly Games</h4>
                <p className="text-sm text-gray-400">Keep an eye on your email or our WhatsApp group. Google releases new &quot;Games&quot; every month. Completing them gives you a Game Badge (1 Point).</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-white/10"></div>
            <div className="flex items-start gap-4">
              <div className="bg-[var(--color-neon-purple)] text-white font-bold px-3 py-1 rounded">TRIVIA</div>
              <div>
                <h4 className="font-bold text-white">Trivia Challenges</h4>
                <p className="text-sm text-gray-400">Test your knowledge! These are quiz-based badges that also award 1 Arcade Point.</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-white/10"></div>
            <div className="flex items-start gap-4">
              <div className="bg-[var(--color-neon-blue)] text-black font-bold px-3 py-1 rounded">SKILL</div>
              <div>
                <h4 className="font-bold text-white">Skill Badges</h4>
                <p className="text-sm text-gray-400">Deep dive learning paths. Every 2 Skill Badges you complete = 1 Arcade Point. (Great for boosting your score!).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prize Counter & Pro Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <section className="arcade-card p-6 rounded-xl border-l-4 border-[var(--color-neon-purple)]">
            <h3 className="text-xl font-bold text-[var(--color-neon-purple)] mb-4 font-[family-name:var(--font-press-start)]">PRIZE COUNTER</h3>
            <p className="text-gray-300 text-sm mb-4">
              The Prize Counter opens twice a year (typically <strong>June</strong> and <strong>December</strong>).
            </p>
            <p className="text-gray-400 text-xs">
              Use your points to claim: <br />
              • Google Cloud T-shirts <br />
              • Backpacks & Laptop Sleeves <br />
              • Mugs & Water Bottles <br />
              • Caps & Stickers
            </p>
          </section>

          <section className="arcade-card p-6 rounded-xl border-l-4 border-yellow-400">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 font-[family-name:var(--font-press-start)]">PRO TIPS</h3>
            <ul className="text-gray-300 text-sm space-y-2 list-disc pl-4">
              <li>Subscribe to "Arcade Insider" emails for bonus points.</li>
              <li>Join the WhatsApp group for quiz answers.</li>
              <li>Skill Badges are the fastest way to rack up points!</li>
            </ul>
          </section>
        </div>

        {/* INSTALL APP SECTION */}
        <section className="arcade-card p-8 rounded-xl border-t-2 border-[var(--color-neon-cyan)] mt-8 text-center bg-black/40">
          <h2 className="text-xl font-[family-name:var(--font-press-start)] mb-2 text-white">
            📲 INSTALL THE APP
          </h2>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
            For the best experience, install Arcade Calc on your device. It works offline and feels like a native app!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex-1 max-w-xs mx-auto">
              <strong className="text-[var(--color-neon-green)] block mb-2 font-bold font-[family-name:var(--font-press-start)] text-xs">ANDROID / CHROME</strong>
              <p className="text-xs text-gray-300">Tap <span className="text-white bg-white/20 px-1 rounded">⋮</span> menu &gt; select <span className="text-white bg-white/20 px-1 rounded">Install App</span></p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex-1 max-w-xs mx-auto">
              <strong className="text-[var(--color-neon-blue)] block mb-2 font-bold font-[family-name:var(--font-press-start)] text-xs">iOS / SAFARI</strong>
              <p className="text-xs text-gray-300">Tap <span className="text-white bg-white/20 px-1 rounded">Share</span> &gt; select <span className="text-white bg-white/20 px-1 rounded">Add to Home Screen</span></p>
            </div>
          </div>
        </section>

      </motion.div>

      {/* Footer */}
      <footer className="w-full text-center mt-20 pb-8 text-gray-500 text-xs font-[family-name:var(--font-outfit)]">
        <p>
          DEVELOPED BY <span className="text-[var(--color-neon-cyan)] animate-pulse">SOMESH TIWARI</span> | 2026 SEASON
        </p>
        <p className="mt-2 text-[10px] opacity-50">Not affiliated with Google Cloud.</p>
      </footer>

      {/* Structural Data for SEO (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Google Cloud Arcade Points Calculator 2026",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Calculate your Google Cloud Skills Boost Arcade points instantly. Track badges, milestones, and rank for the 2026 season.",
            "author": {
              "@type": "Person",
              "name": "Somesh Tiwari"
            }
          }),
        }}
      />
    </main >
  );
}
