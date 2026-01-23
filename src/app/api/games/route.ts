
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
    try {
        const res = await fetch("https://go.cloudskillsboost.google/arcade", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        const html = await res.text();
        const $ = cheerio.load(html);

        const dataCode = $('[data-code]').attr('data-code');
        if (!dataCode) {
            console.error("No data-code attribute found on Arcade page");
            return NextResponse.json({ games: [] });
        }

        const inner$ = cheerio.load(dataCode);
        const games: any[] = [];

        inner$('.card').each((_, element) => {
            const card = inner$(element);
            const text = card.text();

            // Extract Name
            let name = card.find('h3.card-title').text().trim();
            if (!name) name = card.find('h3').first().text().trim();

            // Extract Access Code
            const codeMatch = text.match(/Access code:\s*([^\s\n]+)/i);
            const accessCode = codeMatch ? codeMatch[1] : null;

            // Extract Points
            const pointsMatch = text.match(/Arcade points:\s*(\d+)/i);
            const points = pointsMatch ? parseInt(pointsMatch[1]) : 0;

            // Determine Type
            let type = "Game";
            if (name.toLowerCase().includes("trivia")) type = "Trivia";
            else if (name.toLowerCase().includes("certification")) type = "Skill Badge";

            // Lab Number - simplistic extraction or default
            // Often not explicitly labeled as "Lab Number" in the same way, so we might omit or guess
            // For now, let's look for "Level" or similar, otherwise default
            let labNumber = "GAME";
            if (type === "Trivia") labNumber = "TRIVIA";
            if (type === "Skill Badge") labNumber = "SKILL BADGE";

            // Extract URL
            let url = card.attr('href');
            if (!url) url = card.find('a').attr('href');
            if (url && !url.startsWith('http')) {
                url = `https://go.cloudskillsboost.google${url}`;
            }

            if (name && accessCode) {
                // Determine Level/Category based on context if possible, 
                // but flat list is fine for now as per requirement to just list them.
                games.push({
                    name,
                    points: points || 1, // Default to 1 if not found
                    labNumber,
                    accessCode,
                    type,
                    url
                });
            }
        });

        // Scrape Trivia Section
        // Trivia often resides in sections with class 'diwali-banner' or similar columns not marked as 'card' in the same way
        // Based on analysis, they might be in col-lg-3 divs
        inner$('.col-lg-3').each((_, element) => {
            const card = inner$(element);
            const text = card.text();

            // Extract Name (usually just "Week X")
            let name = card.find('h5.card-title').text().trim();
            if (!name) return; // Skip if no title

            // Should verify if it is actually a trivia card
            // Check for "Access code" presence
            if (!text.includes("Access code")) return;

            // Prefix if needed
            if (!name.toLowerCase().includes("trivia")) {
                name = `Trivia: ${name}`;
            }

            // Extract Access Code
            const codeMatch = text.match(/Access code:\s*([^\s\n]+)/i);
            const accessCode = codeMatch ? codeMatch[1] : null;

            // Extract Points
            const pointsMatch = text.match(/Arcade points:\s*(\d+)/i);
            const points = pointsMatch ? parseInt(pointsMatch[1]) : 0;

            // Extract URL
            let url = card.attr('href');
            if (!url) url = card.find('a').attr('href');
            if (url && !url.startsWith('http')) {
                url = `https://go.cloudskillsboost.google${url}`;
            }

            if (name && accessCode) {
                games.push({
                    name,
                    points: points || 1,
                    labNumber: "TRIVIA",
                    accessCode,
                    type: "Trivia",
                    url
                });
            }
        });

        // Also check for separate links that might be games (Level 1, 2 etc might be just links)
        // The browser analysis showed some might be just links with access codes text nearby
        // But the .card iteration is safer for now. 

        // Return unique games by access code
        const uniqueGames = Array.from(new Map(games.map(item => [item.accessCode, item])).values());

        return NextResponse.json(uniqueGames);
    } catch (e) {
        console.error("Error scraping Arcade:", e);
        return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
    }
}
