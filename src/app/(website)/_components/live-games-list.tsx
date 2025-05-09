"use client"

import { Game } from "@prisma/client";
import {useRouter} from "next/navigation";

interface LiveGamesListProps {
    games: Game[];
}

const LiveGamesList = ({ games }: LiveGamesListProps) => {


    const router = useRouter();

    if (!games.length) {
        return (
            <div className="w-full flex items-center justify-center">
                <p>No Live games currently!</p>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game) => (
                <div
                    key={game.id}
                    className="rounded-md flex justify-between items-center p-4 bg-[#272729] hover:bg-[#323234] transition hover:cursor-pointer"
                    onClick={() => {
                        router.push(`/play/${game.id}`)
                    }}
                >
                    <p className="font-bold truncate">{game.player1}</p>
                    <p className="text-amber-600 font-bold mx-2">vs</p>
                    <p className="font-bold truncate">{game.player2}</p>
                </div>
            ))}
        </div>
    );
};

export default LiveGamesList;