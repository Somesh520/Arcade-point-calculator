import { Copy, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "../../types";

interface GameResource {
    name: string;
    points: number;
    labNumber: string;
    accessCode: string;
    type: "Game" | "Trivia" | "Course" | "Skill Badge";
    url?: string;
}

// Initial data removed in favor of dynamic fetching




interface GameResourcesProps {
    userBadges: Badge[];
}

export default function GameResources({ userBadges }: GameResourcesProps) {
    const [games, setGames] = useState<GameResource[]>([]);
    const [loading, setLoading] = useState(true);

    const isGameCompleted = (gameName: string) => {
        return userBadges.some(badge => {
            const bName = badge.name.toLowerCase().trim();
            const gName = gameName.toLowerCase().trim();

            // 1. Direct equality check (most reliable)
            if (bName === gName) return true;

            // 2. Strict Token Matching
            // Remove common filler words but KEEP "level", "week", "tier" as they are distinguishing factors.
            // Also keep numbers.
            const stopWords = ["the", "arcade", "game", "badge", "zone", "camp", "active"];

            const tokenize = (str: string) => str.split(/[\s:,-]+/).filter(w => {
                // Remove stop words
                if (stopWords.includes(w)) return false;
                // Remove tiny words unless they are numbers or alphanumeric codes (e.g. "AI", "ML", "K8s")
                if (w.length < 2 && !/\d/.test(w)) return false;
                return true;
            });

            const bTokens = tokenize(bName);
            const gTokens = tokenize(gName);

            if (gTokens.length === 0 || bTokens.length === 0) return false;

            // Strategy: 
            // 1. Any NUMBER present in the Game Name MUST exist in the Badge Name.
            //    (e.g., Game "Level 1" must find "1" in Badge "Level 2" -> fails)
            const gNumbers = gTokens.filter(t => /\d/.test(t));
            const bNumbers = bTokens.filter(t => /\d/.test(t));
            const missingNumbers = gNumbers.filter(n => !bNumbers.includes(n));

            if (missingNumbers.length > 0) return false;

            // 2. Check for token overlap
            const intersection = gTokens.filter(t => bTokens.includes(t));

            // Calculate overlap ratio based on Game Name tokens (the reference)
            // If the game is "GenAI Level 1", it has 3 tokens. If Badge matches all 3, great.
            const matchRatio = intersection.length / gTokens.length;

            // Require high confidence (e.g., 80% of game tokens found in badge)
            // This handles "Google Cloud Level 1" vs "Google Cloud Level 1 Checkpoint" -> Match
            return matchRatio >= 0.8;
        });
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch('/api/games');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setGames(data);
                    } else {
                        // Fallback to empty or keep static if API fails/returns empty? 
                        // For now, let's leave it empty to show "No active games found" or similar if we wanted.
                        // Or better, set a fallback state?
                        // User asked for "dynamic", so if dynamic fails, showing nothing is better than showing wrong static data.
                    }
                }
            } catch (err) {
                console.error("Failed to load games", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You might want to add a toast or visual feedback here
    };

    if (loading) {
        return (
            <div className="arcade-card p-8 rounded-2xl mb-8 border-t-4 border-[var(--color-neon-pink)] animate-pulse">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-[family-name:var(--font-press-start)] text-[var(--color-neon-pink)]">
                    ACTIVE ARCADE GAMES
                </h3>
                <div className="space-y-4">
                    <div className="h-8 bg-gray-800 rounded w-full"></div>
                    <div className="h-8 bg-gray-800 rounded w-full"></div>
                    <div className="h-8 bg-gray-800 rounded w-full"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="arcade-card p-8 rounded-2xl mb-8 border-t-4 border-[var(--color-neon-pink)]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-[family-name:var(--font-press-start)] text-[var(--color-neon-pink)]">
                ACTIVE ARCADE GAMES
            </h3>
            <p className="text-gray-400 text-sm mb-4">
                Use these access codes to join active games and earn points! <a href="https://go.cloudskillsboost.google/arcade" target="_blank" rel="noopener noreferrer" className="text-[var(--color-neon-pink)] hover:underline font-bold">Visit the Arcade</a>
            </p>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-500 text-xs border-b border-gray-700">
                            <th className="p-3">GAME NAME</th>
                            <th className="p-3">TYPE</th>
                            <th className="p-3">PTS</th>
                            <th className="p-3">LAB #</th>
                            <th className="p-3">ACCESS CODE</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {games.length > 0 ? (
                            games.map((game, i) => {
                                const completed = isGameCompleted(game.name);
                                return (
                                    <tr key={i} className={`border-b border-gray-800 transition-colors ${completed ? 'bg-[var(--color-neon-green)]/10' : 'hover:bg-white/5'}`}>
                                        <td className="p-3 font-bold flex items-center gap-2">
                                            {completed && <CheckCircle size={16} className="text-[var(--color-neon-green)] flex-shrink-0" />}
                                            {game.url ? (
                                                <a href={game.url} target="_blank" rel="noopener noreferrer" className={`hover:underline transition-colors ${completed ? 'text-[var(--color-neon-green)]' : 'hover:text-[var(--color-neon-pink)]'}`}>
                                                    {game.name}
                                                </a>
                                            ) : (
                                                <span className={completed ? 'text-[var(--color-neon-green)]' : ''}>{game.name}</span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs ${game.type === 'Game' ? 'bg-[var(--color-neon-green)] text-black' :
                                                game.type === 'Trivia' ? 'bg-[var(--color-neon-purple)] text-white' :
                                                    game.type === 'Skill Badge' ? 'bg-[var(--color-neon-blue)] text-black' : 'bg-gray-700'
                                                }`}>
                                                {game.type}
                                            </span>
                                        </td>
                                        <td className="p-3">{game.points}</td>
                                        <td className="p-3 font-mono text-gray-400">{game.labNumber}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => copyToClipboard(game.accessCode)}
                                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors font-mono text-[var(--color-neon-cyan)]"
                                            >
                                                {game.accessCode} <Copy size={12} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-400">
                                    No active games found. Check back later!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">
                *Access codes are community sourced. Mark badges as "No Bonus" if explicitly stated in game rules.
            </p>
        </div>
    );
}
