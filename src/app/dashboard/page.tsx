import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import DashboardClient from "./DashboardClient";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const sp = await searchParams
    const url = sp.url as string

    let title = "Dashboard | Arcade Calculator 2026";

    if (url) {
        title = "Player Stats | Arcade Calculator 2026";
    }

    return {
        title: title,
        openGraph: {
            title: title,
        },
    }
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="text-center p-20 text-white">Loading Dashboard...</div>}>
            <DashboardClient />
        </Suspense>
    );
}
