export interface Badge {
    name: string;
    image: string;
    earnedAt: string;
    type: string;
}

export interface ResultData {
    stats: {
        totalPoints: number;
        gameBadges: number;
        triviaBadges: number;
        skillBadges: number;
        milestones1: boolean;
        milestones2: boolean;
        milestones3: boolean;
        ultimateMilestone: boolean;
    };
    badges: Badge[];
    user: {
        name: string;
        avatar: string;
        rank: string;
    };
}
