import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Google Cloud Arcade Calculator 2026',
        short_name: 'Arcade Calc',
        description: 'Track your Google Cloud Arcade 2026 progress, badges, and milestones.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a12',
        theme_color: '#0a0a12',
        icons: [
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
