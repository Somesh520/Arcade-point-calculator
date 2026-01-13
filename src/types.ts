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
        courseBadges: number; // For Lab Free
        milestones: {
            facilitator: {
                m1: boolean;
                m2: boolean;
                m3: boolean;
                ultimate: boolean;
            };
            swag: {
                novice: boolean;
                trooper: boolean;
                ranger: boolean;
                champion: boolean;
                legend: boolean;
            };
        };
    };
    badges: Badge[];
    user: {
        name: string;
        avatar: string;
        rank: string;
    };
}
