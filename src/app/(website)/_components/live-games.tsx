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

const LiveGames = ({ games} : LiveGamesProps) => {
    return <div className={"text-white p-4 md:p-8 lg:p-16 flex flex-col gap-y-4 max-w-full"}>
        <div className={"flex flex-col"}>
            <h1 className={"font-bold text-2xl"}>Live Featured Games</h1>
            <h2 className={"text-sm text-muted"}>Watch top players and exciting matches happening right now</h2>
        </div>
        <div>
            <LiveGamesList games={games}/>
        </div>
    </div>
}


export default LiveGames