import { create } from "zustand";

interface SocketState {
    socket: WebSocket | null;
    setSocket: (newSocket: WebSocket | null) => void;
}

const useSocketStore = create<SocketState>((set) => ({
    socket: null,
    setSocket: (newSocket) => set({ socket: newSocket }),
}));

export const useSocketState = () => useSocketStore((state) => state.socket);
export const useSetSocket = () => useSocketStore((state) => state.setSocket);
