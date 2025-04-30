"use client"

import {useSocket} from "@/hooks/useSocket";
import ChessBoard from "@/components/chess-board";
import {Button} from "@/components/ui/button";
import {User} from "@prisma/client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSocketState} from "@/lib/store";

const PlayClient = ({user} : {user : User}) => {
    const socket = useSocketState()
    useSocket(user.username)
    const router = useRouter()

    useEffect(() => {
        if (socket) {
            const handleMessage = (e : any) => {
                const parsedData = JSON.parse(e.data);
                if (parsedData.type === "gameId") {
                    const gameId = parsedData.gameId;
                    router.push(`/play/${gameId}`);
                }
            }

            socket.addEventListener("message",handleMessage);


            return () => {
                socket.removeEventListener("message",handleMessage);
            }
        }
    },[socket])

    const handlePlayClick = () => {
        if (socket) {
            console.log("Sending message...");
            socket.send(
                JSON.stringify({
                    type : "join_game"
                })
            );
        } else {
            console.warn("Socket not connected.");
        }
    };

    return <div className={"bg-black h-screen flex justify-between items-center"}>
        <ChessBoard
            initialCells={[
                { coords: { x: 0, y: 0 }, symbol: "br" },
                { coords: { x: 0, y: 1 }, symbol: "bn" },
                { coords: { x: 0, y: 2 }, symbol: "bb" },
                { coords: { x: 0, y: 3 }, symbol: "bq" },
                { coords: { x: 0, y: 4 }, symbol: "bk" },
                { coords: { x: 0, y: 5 }, symbol: "bb" },
                { coords: { x: 0, y: 6 }, symbol: "bn" },
                { coords: { x: 0, y: 7 }, symbol: "br" },
                { coords: { x: 1, y: 0 }, symbol: "bp" },
                { coords: { x: 1, y: 1 }, symbol: "bp" },
                { coords: { x: 1, y: 2 }, symbol: "bp" },
                { coords: { x: 1, y: 3 }, symbol: "bp" },
                { coords: { x: 1, y: 4 }, symbol: "bp" },
                { coords: { x: 1, y: 5 }, symbol: "bp" },
                { coords: { x: 1, y: 6 }, symbol: "bp" },
                { coords: { x: 1, y: 7 }, symbol: "bp" },
                { coords: { x: 6, y: 0 }, symbol: "wp" },
                { coords: { x: 6, y: 1 }, symbol: "wp" },
                { coords: { x: 6, y: 2 }, symbol: "wp" },
                { coords: { x: 6, y: 3 }, symbol: "wp" },
                { coords: { x: 6, y: 4 }, symbol: "wp" },
                { coords: { x: 6, y: 5 }, symbol: "wp" },
                { coords: { x: 6, y: 6 }, symbol: "wp" },
                { coords: { x: 6, y: 7 }, symbol: "wp" },
                { coords: { x: 7, y: 0 }, symbol: "wr" },
                { coords: { x: 7, y: 1 }, symbol: "wn" },
                { coords: { x: 7, y: 2 }, symbol: "wb" },
                { coords: { x: 7, y: 3 }, symbol: "wq" },
                { coords: { x: 7, y: 4 }, symbol: "wk" },
                { coords: { x: 7, y: 5 }, symbol: "wb" },
                { coords: { x: 7, y: 6 }, symbol: "wn" },
                { coords: { x: 7, y: 7 }, symbol: "wr" },
            ]}
        />
        <Button onClick={handlePlayClick}>Play</Button>
    </div>
}

export default PlayClient