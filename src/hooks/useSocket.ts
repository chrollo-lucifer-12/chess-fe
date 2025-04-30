// hooks/useSocket.ts
import { useEffect } from "react";
import { useSetSocket, useSocketState } from "@/lib/store";

let hasInitialized = false;

export const useSocket = (username: string) => {
    const setSocket = useSetSocket();
    const socket = useSocketState();

    useEffect(() => {
        if (hasInitialized || socket) return;

        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            console.log("connected");
            ws.send(JSON.stringify({
                type: "join_lobby",
                username,
            }));
        };

        ws.onclose = () => {
            console.log("disconnected");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        setSocket(ws);
        hasInitialized = true;

    }, [username, setSocket, socket]);
};
