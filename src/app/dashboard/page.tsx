"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Trophy, Medal, Award, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ResultData } from "../../types";

function DashboardContent() {
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
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h2 className="text-red-500 font-bold mb-4">ERROR</h2>
                <p className="mb-6">{error}</p>
                <button onClick={() => router.push("/")} className="underline text-gray-400">Back to Home</button>
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

                {/* Milestones */}
                <div className="arcade-card p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <CheckCircle className="text-[var(--color-neon-green)]" /> Milestones Progress
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: "Milestone 1", target: 10, reached: result.stats.milestones1 },
                            { name: "Milestone 2", target: 25, reached: result.stats.milestones2 },
                            { name: "Milestone 3", target: 50, reached: result.stats.milestones3 },
                            { name: "Ultimate Milestone", target: 70, reached: result.stats.ultimateMilestone },
                        ].map((m, i) => {
                            const progress = Math.min(100, Math.max(0, (result.stats.totalPoints / m.target) * 100));

                            return (
                                <div key={i} className="bg-black/20 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={m.reached ? "text-white font-bold" : "text-gray-400"}>
                                            {m.name} <span className="text-xs opacity-70">({m.target}+ pts)</span>
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${m.reached ? "bg-green-500/20 text-green-400" : "bg-gray-800 text-gray-500"}`}>
                                            {m.reached ? "COMPLETED" : "LOCKED"}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-800 rounded-full h-2.5 mb-1 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-2.5 rounded-full ${m.reached ? "bg-[var(--color-neon-green)]" : "bg-[var(--color-neon-pink)]"}`}
                                        ></motion.div>
                                    </div>
                                    <p className="text-right text-[10px] text-gray-400">
                                        {Math.min(result.stats.totalPoints, m.target)} / {m.target} PTS
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </main>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="text-center p-20 text-white">Loading Dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
