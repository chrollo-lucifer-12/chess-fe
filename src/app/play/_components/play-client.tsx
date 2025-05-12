"use client"

import { useSocket } from "@/hooks/useSocket";
import ChessBoard from "@/components/chess-board";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSetColor, useSetOpponent, useSocketState } from "@/lib/store";
import { initialCells } from "@/lib/definitions";

const PlayClient = ({ user }: { user: User }) => {
    const socket = useSocketState();
    const setColor = useSetColor();
    const setOpponent = useSetOpponent();
    useSocket(user.username);
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (socket) {
            const handleMessage = (e: any) => {
                const parsedData = JSON.parse(e.data);
                if (parsedData.type === "gameId") {
                    const gameId = parsedData.gameId;
                    router.push(`/play/${gameId}`);
                }
                if (parsedData.type === "init_game") {
                    const { color, opponent } = parsedData.payload;
                    setColor(color);
                    setOpponent(opponent);
                    setIsSearching(false);
                }
            };

            socket.addEventListener("message", handleMessage);

            return () => {
                socket.removeEventListener("message", handleMessage);
            };
        }
    }, [socket, router, setColor, setOpponent]);

    const handlePlayClick = () => {
        if (socket) {
            setIsSearching(true);
            socket.send(
                JSON.stringify({
                    type: "join_game"
                })
            );
        } else {
            console.warn("Socket not connected.");
        }
    };

    return (
        <div className="h-screen bg-black flex flex-col items-center justify-center space-y-8 p-4">
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold text-white mb-4">Chess Matchmaking</h1>
                <p className="text-gray-400 mb-6">Welcome, {user.username}</p>
            </div>

            <div className="w-full max-w-xl">
                <ChessBoard
                    isStatic={true}
                    cells={initialCells}
                />
            </div>

            <Button
                onClick={handlePlayClick}
                disabled={isSearching}
                className="w-full max-w-md py-3 text-lg font-semibold
                           bg-gray-800 hover:bg-gray-700 text-white
                           border border-gray-700 rounded-full
                           transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSearching ? "Searching for opponent..." : "Find a Match"}
            </Button>

            {isSearching && (
                <div className="animate-pulse text-gray-500">
                    Searching for an opponent...
                </div>
            )}
        </div>
    );
};

export default PlayClient;