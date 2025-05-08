"use client"

import {useSocket} from "@/hooks/useSocket";
import ChessBoard from "@/components/chess-board";
import {Button} from "@/components/ui/button";
import {User} from "@prisma/client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSetColor, useSetOpponent, useSocketState} from "@/lib/store";
import {initialCells} from "@/lib/definitions";

const PlayClient = ({user} : {user : User}) => {
    const socket = useSocketState()
    const setColor = useSetColor()
    const setOpponent = useSetOpponent()
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
                if (parsedData.type === "init_game") {
                    const {color, opponent} = parsedData.payload;
                    setColor(color)
                    setOpponent(opponent);
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

    return <div className={"h-full flex justify-between items-center"}>
        <ChessBoard
            isStatic={true}
            cells={initialCells}
        />
        <Button onClick={handlePlayClick}>Play</Button>
    </div>
}

export default PlayClient