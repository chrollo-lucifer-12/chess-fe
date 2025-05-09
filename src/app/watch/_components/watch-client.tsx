"use client"

import {useSocketState} from "@/lib/store";
import {useEffect, useState} from "react";
import {useSocket} from "@/hooks/useSocket";
import ChessBoard, {CellType} from "@/components/chess-board";
import {Game} from "@prisma/client";

interface WatchClientProps {
    gameId : string
    username : string
    game : Game
}

const WatchClient = ({gameId, username, game} : WatchClientProps) => {

    const socket = useSocketState();
    useSocket(username)

    const [cells, setCells] = useState<CellType[]>([])
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        if (!socket) return;
        const sendJoinMessage = () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    type: "join_game",
                    gameId
                }));
            }
        };
        if (socket.readyState === WebSocket.OPEN) {
            sendJoinMessage();
            setConnected(true);
        }
        const openHandler = () => {
            sendJoinMessage();
            setConnected(true);
        };
        socket.addEventListener("open", openHandler);

        const messageHandler = (e : any) => {
            const parsedMessage = JSON.parse(e.data);
            if (parsedMessage.type === "update") {
                setCells(parsedMessage.board);
            }
        };

        socket.addEventListener("message", messageHandler);

        return () => {
            socket.removeEventListener("open", openHandler);
            socket.removeEventListener("message", messageHandler);
        };
    }, [gameId, username, socket]);

    if (!connected) {
        return <p className={"text-white"}>Connecting to game...</p>
    }

    return <div>
        <p>{game.player1}</p> <p>vs</p> <p>{game.player2}</p>
        <ChessBoard isStatic={true} cells={cells}/>
    </div>
}

export default WatchClient