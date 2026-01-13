"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calendar, CheckCircle, ShieldAlert, Trophy, Target, Star } from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto pb-24">
            <Link href="/">
                <button className="mb-8 flex items-center gap-2 text-[var(--color-neon-cyan)] hover:text-white transition-colors font-[family-name:var(--font-press-start)] text-xs">
                    <ArrowLeft size={16} /> BACK TO HOME
                </button>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-pink)] to-[var(--color-neon-cyan)] font-[family-name:var(--font-press-start)] leading-relaxed mb-4">
                        ARCADE 2026 OFFICIAL GUIDE
                    </h1>
                    <p className="text-gray-400 font-[family-name:var(--font-outfit)]">
                        Everything you need to know about the Google Cloud Arcade 2026 Season.
                    </p>
                </div>

                {/* 1. Welcome */}
                <section className="arcade-card p-8 rounded-2xl border border-[var(--color-neon-cyan)]/20">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <Star className="text-[var(--color-neon-yellow)]" /> Welcome to Arcade 2026
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        The Google Cloud Arcade is a gamified cloud learning program designed to help learners build real, hands-on Google Cloud skills through labs, games, quizzes, and challenges — completely free. It is not just about swags; it is about learning cloud skills that matter for careers.
                    </p>
                </section>

                {/* 2. Timeline */}
                <section className="arcade-card p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Calendar className="text-[var(--color-neon-pink)]" /> Program Timeline
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                            <h3 className="text-[var(--color-neon-cyan)] font-bold mb-2">Phase 1 (Cohort 1)</h3>
                            <p className="text-white text-sm mb-2">📅 January - June 2026</p>
                            <p className="text-gray-400 text-xs">Tentative Start: Second week of January</p>
                        </div>
                        <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                            <h3 className="text-[var(--color-neon-pink)] font-bold mb-2">Phase 2 (Cohort 2)</h3>
                            <p className="text-white text-sm mb-2">📅 July - December 2026</p>
                            <p className="text-gray-400 text-xs">Facilitator program runs for 2.5 months per phase.</p>
                        </div>
                    </div>
                </section>

                {/* 3. Pre-requisites */}
                <section className="arcade-card p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle className="text-[var(--color-neon-green)]" /> Mandatory Setup
                    </h2>
                    <div className="space-y-4 text-gray-300">
                        <div className="flex gap-3">
                            <div className="min-w-6 text-xl">1️⃣</div>
                            <div>
                                <strong className="text-white">Subscribe to The Arcade:</strong> You must subscribe at least once per season via the Arcade Home Page. Look for the "Thanks for filling out this form" email.
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="min-w-6 text-xl">2️⃣</div>
                            <div>
                                <strong className="text-white">Public Profile:</strong> Your Google Skills Profile must be set to PUBLIC and email updates enabled.
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="min-w-6 text-xl">✅</div>
                            <div>
                                <strong className="text-white">Eligibility:</strong> 18+ years old, working laptop/PC, enthusiasm to learn. No prior experience needed!
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Point System */}
                <section className="arcade-card p-8 rounded-2xl border border-[var(--color-neon-yellow)]/20">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Trophy className="text-[var(--color-neon-yellow)]" /> Points System
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-white/5 p-4 rounded-lg">
                            <h4 className="font-bold text-[var(--color-neon-cyan)] mb-2">Hands-on Labs</h4>
                            <ul className="text-sm text-gray-400 space-y-1">
                                <li>Level 1 (12 labs) = 1 Point</li>
                                <li>Level 2 (12 labs) = 1 Point</li>
                                <li>Level 3 (8 labs) = 1 Point</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                            <h4 className="font-bold text-[var(--color-neon-pink)] mb-2">Other Games</h4>
                            <ul className="text-sm text-gray-400 space-y-1">
                                <li>Base Camp (12 labs) = 1 Point</li>
                                <li>Certification Zone (8 labs) = 1 Point</li>
                                <li>Trivia (Weekly 4 labs) = 1 Point</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg col-span-full border border-[var(--color-neon-green)]/30">
                            <h4 className="font-bold text-[var(--color-neon-green)] mb-2">Skill Badges (Booster) 🚀</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li>2 Skill Badges = 1 Point</li>
                                <li>90+ Skill Badges = 45 Points (Huge Bonus!)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 5. Rules */}
                <section className="arcade-card p-8 rounded-2xl bg-red-900/10 border border-red-500/30">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <ShieldAlert className="text-red-500" /> Strict Rules
                    </h2>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                            <span className="text-red-500">🚫</span> Do NOT complete skill badges unless instructed.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-500">🚫</span> Do NOT explore random badges or do lab-free courses on your own.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-500">🚫</span> Never share/sell voucher codes or accounts.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✅</span> ONLY complete badges listed on the official Arcade page.
                        </li>
                    </ul>
                </section>

                <div className="text-center mt-12 mb-8">
                    <Link href="/">
                        <button className="pixel-button bg-[var(--color-neon-cyan)] text-black px-8 py-4 rounded font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                            <Target size={20} /> START CALCULATING
                        </button>
                    </Link>
                </div>

            </motion.div>
        </main>
    );
}
