import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface Badge {
  name: string;
  image: string;
  earnedAt: string;
  type: 'Game' | 'Trivia' | 'Skill Badge' | 'Course' | 'Other';
}

interface CalculateResult {
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

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Validation: Allow both cloudskillsboost.google and skills.google
    if (!url || (!url.includes('cloudskillsboost.google') && !url.includes('skills.google'))) {
      return NextResponse.json(
        { error: 'Invalid URL. Must be from cloudskillsboost.google or skills.google' },
        { status: 400 }
      );
    }

    // Minimal check for empty string
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    console.log(`Fetched URL: ${url}`);
    console.log(`Response Status: ${response.status}`);
    console.log(`HTML Length: ${html.length}`);

    // Profile Extraction
    const name = $('h1.ql-display-small').text().trim();
    // Try both old and new selectors for avatar
    const avatar = $('ql-avatar').attr('src') || $('div.avatar img').attr('src') || '';
    // Rank is often in div.profile-league > h2
    const rank = $('div.profile-league h2').text().trim() || $('p.ql-body-medium').first().text().trim();

    console.log(`Parsed Name: "${name}"`);
    console.log(`Parsed Avatar: "${avatar}"`);
    console.log(`Parsed Rank: "${rank}"`);

    if (!name) {
      console.error("Failed to parse name. Dumping partial HTML for debugging...");
      console.log(html.substring(0, 500)); // Log first 500 chars to see if it's a block page
    }

    // Badge Parsing
    const badges: Badge[] = [];
    $('.profile-badge').each((_, el) => {
      const name = $(el).find('.ql-title-medium').text().trim();
      const image = $(el).find('img').attr('src') || '';
      const dateStr = $(el).find('.ql-body-medium').text().trim();
      // Logic to classify badges
      let type: Badge['type'] = 'Other';
      if (name.toLowerCase().includes('game')) type = 'Game';
      else if (name.toLowerCase().includes('trivia')) type = 'Trivia';
      else if (name.toLowerCase().includes('assessment') || name.toLowerCase().includes('skill badge')) type = 'Skill Badge';
      else if (name.toLowerCase().includes('course')) type = 'Course';

      badges.push({ name, image, earnedAt: dateStr, type });
    });

    // 2026 Season Logic: Only count badges earned in 2026
    const badges2026 = badges.filter(b => b.earnedAt.includes('2026'));

    const gameBadges = badges2026.filter(b => b.type === 'Game').length;
    const triviaBadges = badges2026.filter(b => b.type === 'Trivia').length;
    const skillBadges = badges2026.filter(b => b.type === 'Skill Badge').length;

    // Points: Game=1, Trivia=1, SkillBadge = 1 pt per 2 badges (0.5 each)
    const skillPoints = Math.floor(skillBadges / 2);
    // Note: This is an approximation. Real logic might need specific badge names for "Special Games" (2pts).

    const totalPoints = gameBadges + triviaBadges + skillPoints;

    const result: CalculateResult = {
      stats: {
        totalPoints,
        gameBadges,
        triviaBadges,
        skillBadges,
        milestones1: totalPoints >= 10, // Placeholder thresholds
        milestones2: totalPoints >= 25,
        milestones3: totalPoints >= 50,
        ultimateMilestone: totalPoints >= 70,
      },
      badges,
      user: {
        name,
        avatar,
        rank,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error calculating points:', error);
    return NextResponse.json(
      { error: 'Failed to fetch or parse profile' },
      { status: 500 }
    );
  }
}
