import { create } from "zustand";

interface GameState {
    socket: WebSocket | null;
    color : string | undefined;
    opponent : string | undefined
    setOpponent : (newOpponent : string | undefined) => void
    setColor : (newColor : string | undefined) => void
    setSocket: (newSocket: WebSocket | null) => void;
}

const useGameStore = create<GameState>((set) => ({
    socket: null,
    color : undefined,
    opponent : undefined,
    setColor : (newColor) => set({color : newColor}),
    setOpponent : (newOpponent) => set({opponent : newOpponent}),
    setSocket: (newSocket) => set({ socket: newSocket }),
}));

export const useSocketState = () => useGameStore((state) => state.socket);
export const useColor = () => useGameStore((state) => state.color)
export const useOpponent = () => useGameStore((state) => state.opponent)
export const useSetColor = () => useGameStore((state) => state.setColor);
export const useSetOpponent = () => useGameStore((state) => state.setOpponent);
export const useSetSocket = () => useGameStore((state) => state.setSocket);
