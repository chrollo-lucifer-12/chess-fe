"use client"

import {Game} from "@prisma/client";
import LiveGamesSkeleton from "@/app/(website)/_components/live-games-skeleton";
import dynamic from "next/dynamic";

const LiveGamesList = dynamic(
    () => import("@/app/(website)/_components/live-games-list"),
    {
        loading: () => <LiveGamesSkeleton />,
    }
);

interface LiveGamesProps {
    games : Game[]
}

const LiveGames = ({ games }: LiveGamesProps) => {
    return (
        <section className="text-white py-8 px-4 md:px-8 lg:px-16 flex flex-col gap-y-4 mb-16 w-full">
            <div className="flex flex-col">
                <h1 className="font-bold text-2xl">Live Featured Games</h1>
                <h2 className="text-sm text-muted">Watch top players and exciting matches happening right now</h2>
            </div>
            <div className="w-full">
                <LiveGamesList games={games}/>
            </div>
        </section>
    );
}

export default LiveGames;