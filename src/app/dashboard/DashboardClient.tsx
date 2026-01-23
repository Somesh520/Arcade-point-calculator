"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Trophy, Medal, Award, AlertTriangle } from "lucide-react";
import { ResultData } from "../../types";
import { motion } from "framer-motion";
import GameResources from "./GameResources";

export default function DashboardClient() {
    const searchParams = useSearchParams();
    const url = searchParams.get("url");
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<ResultData | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!url) {
            router.push("/");
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch("/api/calculate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
                });

                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setResult(data);

                // Save to LocalStorage
                const savedProfiles = JSON.parse(localStorage.getItem("arcadeProfiles") || "[]");
                const newProfile = { name: data.user.name, avatar: data.user.avatar, url };
                // Avoid duplicates
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const exists = savedProfiles.find((p: any) => p.url === url);
                if (!exists) {
                    localStorage.setItem("arcadeProfiles", JSON.stringify([newProfile, ...savedProfiles]));
                }

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError("Error: " + err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-[var(--color-neon-pink)] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 font-[family-name:var(--font-press-start)] text-[var(--color-neon-pink)] animate-pulse">CALCULATING...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 font-[family-name:var(--font-outfit)]">
                <div className="arcade-card p-8 rounded-2xl border-2 border-red-500 max-w-md w-full text-center relative overflow-hidden backdrop-blur-xl bg-black/80 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                    <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-red-500/10 rounded-full border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                            <AlertTriangle size={48} className="text-red-500 animate-pulse" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-2 text-red-500 font-[family-name:var(--font-press-start)] tracking-widest uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                        SYSTEM ERROR
                    </h2>

                    <div className="w-full h-px bg-red-500/30 my-6"></div>

                    <p className="mb-8 text-gray-300 font-mono text-sm leading-relaxed border border-red-500/20 bg-black/50 p-4 rounded">
                        {error}
                    </p>

                    <button
                        onClick={() => router.push("/")}
                        className="group relative px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-[family-name:var(--font-press-start)] text-xs rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] w-full overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            RETURN TO BASE
                        </span>
                    </button>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
                </div>
            </div>
        );
    }

    if (!result) return null;

    return (
        <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-12 font-[family-name:var(--font-outfit)]">
            <div className="w-full max-w-5xl mb-8">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-[family-name:var(--font-press-start)] text-xs"
                >
                    <ArrowLeft size={16} /> BACK TO HOME
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl space-y-8"
            >
                {/* User Profile Card */}
                <div className="arcade-card p-6 rounded-2xl flex items-center gap-6 border-l-4 border-[var(--color-neon-cyan)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <Trophy size={100} className="text-[var(--color-neon-cyan)]/10 transform rotate-12" />
                    </div>

                    {result.user.avatar && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={result.user.avatar} alt="Profile" className="w-20 h-20 rounded-full border-2 border-[var(--color-neon-cyan)] z-10" />
                    )}
                    <div className="z-10">
                        <h2 className="text-2xl font-bold">{result.user.name}</h2>
                        <p className="text-[var(--color-neon-cyan)] font-[family-name:var(--font-press-start)] text-xs mt-2">{result.user.rank}</p>
                    </div>
                    <div className="ml-auto text-right md:block hidden z-10">
                        <p className="text-gray-400 text-sm">Total Points</p>
                        <p className="text-4xl font-bold neon-text-pink font-[family-name:var(--font-press-start)]">{result.stats.totalPoints}</p>
                    </div>
                </div>

                {/* Mobile Points Display */}
                <div className="md:hidden text-center arcade-card p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Total Points</p>
                    <p className="text-3xl font-bold neon-text-pink font-[family-name:var(--font-press-start)]">{result.stats.totalPoints}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Game Badges", value: result.stats.gameBadges, icon: <Trophy className="text-yellow-400" />, color: "border-yellow-400" },
                        { label: "Trivia Badges", value: result.stats.triviaBadges, icon: <Award className="text-purple-400" />, color: "border-purple-400" },
                        { label: "Skill Badges", value: result.stats.skillBadges, icon: <Medal className="text-blue-400" />, color: "border-blue-400" },
                    ].map((stat, i) => (
                        <div key={i} className={`arcade-card p-6 rounded-xl border-t-4 ${stat.color} flex flex-col items-center justify-center text-center hover:scale-105 transition-transform`}>
                            <div className="mb-4 p-3 bg-white/5 rounded-full">{stat.icon}</div>
                            <h3 className="text-gray-400 mb-2">{stat.label}</h3>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Swag Tiers */}
                <div className="arcade-card p-8 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Trophy className="text-[var(--color-neon-yellow)]" /> Swag Eligibility
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: "Arcade Novice", target: 25, reached: result.stats.milestones.swag.novice },
                            { name: "Arcade Trooper", target: 45, reached: result.stats.milestones.swag.trooper },
                            { name: "Arcade Ranger", target: 65, reached: result.stats.milestones.swag.ranger },
                            { name: "Arcade Champion", target: 75, reached: result.stats.milestones.swag.champion },
                            { name: "Arcade Legend", target: 95, reached: result.stats.milestones.swag.legend },
                        ].map((tier, i) => {
                            const progress = Math.min(100, Math.max(0, (result.stats.totalPoints / tier.target) * 100));
                            return (
                                <div key={i} className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className={tier.reached ? "text-[var(--color-neon-yellow)] font-bold" : "text-gray-400"}>
                                            {tier.name} ({tier.target} pts)
                                        </span>
                                        <span className={tier.reached ? "text-green-400" : "text-gray-600"}>
                                            {tier.reached ? "UNLOCKED" : "LOCKED"}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className={`h-full ${tier.reached ? "bg-[var(--color-neon-yellow)]" : "bg-gray-600"}`}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className="arcade-card p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <CheckCircle className="text-[var(--color-neon-cyan)]" /> Facilitator Milestones
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            {
                                name: "Milestone 1",
                                reached: result.stats.milestones.facilitator.m1,
                                req: "6 Game, 5 Trivia, 14 Skill, 6 Lab Free"
                            },
                            {
                                name: "Milestone 2",
                                reached: result.stats.milestones.facilitator.m2,
                                req: "8 Game, 6 Trivia, 28 Skill, 12 Lab Free"
                            },
                            {
                                name: "Milestone 3",
                                reached: result.stats.milestones.facilitator.m3,
                                req: "10 Game, 7 Trivia, 38 Skill, 18 Lab Free"
                            },
                            {
                                name: "Ultimate Milestone",
                                reached: result.stats.milestones.facilitator.ultimate,
                                req: "12 Game, 8 Trivia, 52 Skill, 24 Lab Free"
                            },
                        ].map((m, i) => (
                            <div key={i} className={`p-4 rounded-lg border ${m.reached ? "border-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10" : "border-gray-700 bg-black/40"}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className={`font-bold ${m.reached ? "text-white" : "text-gray-400"}`}>{m.name}</h4>
                                    {m.reached ? <CheckCircle size={16} className="text-[var(--color-neon-green)]" /> : <div className="w-4 h-4 rounded-full border border-gray-600" />}
                                </div>
                                <p className="text-[10px] text-gray-500">{m.req}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Badge Gallery */}
                <div className="arcade-card p-8 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-[family-name:var(--font-press-start)] text-white">
                        BADGE GALLERY <span className="text-xs text-gray-500 font-sans font-normal ml-2">({result.badges.filter(b => b.earnedAt.includes('2026')).length} items)</span>
                    </h3>

                    {/* Game Badges */}
                    {result.badges.some(b => b.type === 'Game' && b.earnedAt.includes('2026')) && (
                        <div className="mb-8">
                            <h4 className="text-[var(--color-neon-green)] font-bold mb-4 border-b border-gray-700 pb-2">GAMES</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {result.badges.filter(b => b.type === 'Game' && b.earnedAt.includes('2026')).map((badge, i) => (
                                    <div key={i} className="bg-black/40 p-3 rounded-lg flex flex-col items-center text-center">
                                        <img src={badge.image} alt={badge.name} className="w-16 h-16 mb-2" />
                                        <p className="text-xs font-bold leading-tight line-clamp-2" title={badge.name}>{badge.name}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">{badge.earnedAt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Trivia Badges */}
                    {result.badges.some(b => b.type === 'Trivia' && b.earnedAt.includes('2026')) && (
                        <div className="mb-8">
                            <h4 className="text-[var(--color-neon-purple)] font-bold mb-4 border-b border-gray-700 pb-2">TRIVIA</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {result.badges.filter(b => b.type === 'Trivia' && b.earnedAt.includes('2026')).map((badge, i) => (
                                    <div key={i} className="bg-black/40 p-3 rounded-lg flex flex-col items-center text-center">
                                        <img src={badge.image} alt={badge.name} className="w-16 h-16 mb-2" />
                                        <p className="text-xs font-bold leading-tight line-clamp-2" title={badge.name}>{badge.name}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">{badge.earnedAt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skill Badges */}
                    {result.badges.some(b => b.type === 'Skill Badge' && b.earnedAt.includes('2026')) && (
                        <div className="mb-8">
                            <h4 className="text-[var(--color-neon-blue)] font-bold mb-4 border-b border-gray-700 pb-2">SKILL BADGES</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {result.badges.filter(b => b.type === 'Skill Badge' && b.earnedAt.includes('2026')).map((badge, i) => {
                                    const isPreAssessment = badge.name.toLowerCase().includes('assessment');
                                    return (
                                        <div key={i} className={`bg-black/40 p-3 rounded-lg flex flex-col items-center text-center relative ${isPreAssessment ? 'opacity-75' : ''}`}>
                                            {isPreAssessment && (
                                                <div className="absolute top-1 right-1 bg-gray-700 text-[8px] px-1 rounded text-gray-300">NO BONUS</div>
                                            )}
                                            <img src={badge.image} alt={badge.name} className="w-16 h-16 mb-2" />
                                            <p className="text-xs font-bold leading-tight line-clamp-2" title={badge.name}>{badge.name}</p>
                                            <p className="text-[10px] text-gray-500 mt-1">{badge.earnedAt}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Course Badges / Others */}
                    {result.badges.some(b => (b.type === 'Course' || b.type === 'Other') && b.earnedAt.includes('2026')) && (
                        <div>
                            <h4 className="text-gray-400 font-bold mb-4 border-b border-gray-700 pb-2">COURSES & OTHERS</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {result.badges.filter(b => (b.type === 'Course' || b.type === 'Other') && b.earnedAt.includes('2026')).map((badge, i) => (
                                    <div key={i} className="bg-black/40 p-3 rounded-lg flex flex-col items-center text-center opacity-60">
                                        <img src={badge.image} alt={badge.name} className="w-16 h-16 mb-2 grayscale" />
                                        <p className="text-xs font-bold leading-tight line-clamp-2" title={badge.name}>{badge.name}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">{badge.earnedAt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Game Resources Section */}
                <GameResources userBadges={result.badges} />
            </motion.div>
        </main>
    );
}
