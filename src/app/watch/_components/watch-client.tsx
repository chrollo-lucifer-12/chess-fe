"use client"

import {useSocketState} from "@/lib/store";
import {useEffect, useState} from "react";
import {useSocket} from "@/hooks/useSocket";
import ChessBoard, {CellType} from "@/components/chess-board";

interface WatchClientProps {
    gameId : string
    username : string
}

const WatchClient = ({gameId, username} : WatchClientProps) => {

    const socket = useSocketState();
    useSocket(username)

    const [cells, setCells] = useState<CellType[]>([])
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        if (!socket) return;

        // Function to handle sending the join message
        const sendJoinMessage = () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    type: "join_game",
                    gameId
                }));
            }
        };

        // If socket is already open, send the message immediately
        if (socket.readyState === WebSocket.OPEN) {
            sendJoinMessage();
            setConnected(true);
        }

        // Otherwise, listen for the open event
        const openHandler = () => {
            sendJoinMessage();
            setConnected(true);
        };

        // Add event listeners
        socket.addEventListener("open", openHandler);

        const messageHandler = (e : any) => {
            const parsedMessage = JSON.parse(e.data);
            if (parsedMessage.type === "update") {
                setCells(parsedMessage.board);
            }
        };

        socket.addEventListener("message", messageHandler);

        // Cleanup
        return () => {
            socket.removeEventListener("open", openHandler);
            socket.removeEventListener("message", messageHandler);
        };
    }, [gameId, username, socket]);

    if (!connected) {
        return <p className={"text-white"}>Connecting to game...</p>
    }

    return <div>
        <ChessBoard isStatic={true} cells={cells}/>
    </div>
}

export default WatchClient