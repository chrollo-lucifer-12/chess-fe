"use client"

import { Button } from "@/components/ui/button";
import { Flag, Check, X, Send } from "lucide-react";
import { useSocketState } from "@/lib/store";
import React from "react"
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface MovesTableProps {
    isPopOverOpen: boolean;
    setIsPopoverOpen: (res: boolean) => void;
    gameId: string;
    messages: { username: string, message: string }[];
    moves: string[];
}

const MovesTable = ({ isPopOverOpen, setIsPopoverOpen, gameId, messages, moves }: MovesTableProps) => {
    const socket = useSocketState();
    const [message, setMessage] = useState("");

    // Format moves for chess.com style display (paired white/black moves)
    const formattedMoves = [];
    for (let i = 0; i < moves.length; i += 2) {
        formattedMoves.push({
            moveNumber: Math.floor(i / 2) + 1,
            whiteMove: moves[i],
            blackMove: i + 1 < moves.length ? moves[i + 1] : null
        });
    }

    return (
        <div className="bg-[#272729] w-[400px] rounded shadow-lg">
            <div className="flex flex-col">
                <div className="p-3 border-b border-gray-700">
                    <h1 className="font-bold text-xl text-white text-center">Moves</h1>
                </div>
                <div className="p-2">
                    <ScrollArea className="h-[320px]">
                        <div className="">
                            {formattedMoves.map((moveSet) => (
                                <div key={moveSet.moveNumber} className={"flex items-center "}>
                                    <div className="text-gray-400 font-medium px-2 text-xs">{moveSet.moveNumber}.</div>
                                    <div className={"flex justify-between w-[200px]"}>

                                    <div className="px-2 py-1  text-xs text-[#b5b5b5] font-bold">
                                        {moveSet.whiteMove}
                                    </div>
                                    {moveSet.blackMove && (
                                        <div className="px-2 py-1  text-xs text-[#b5b5b5] font-bold">
                                            {moveSet.blackMove}
                                        </div>
                                    )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="p-3 border-t border-b border-gray-700 flex justify-center gap-3">
                    {isPopOverOpen && (
                        <div className="absolute bg-gray-900 p-3 rounded shadow-lg border border-gray-700 z-10">
                            <p className="text-white mb-2">Accept Draw?</p>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => {
                                        socket?.send(JSON.stringify({
                                            type: "draw_result",
                                            result: true,
                                            gameId
                                        }));
                                        setIsPopoverOpen(false);
                                    }}
                                >
                                    <Check className="mr-1 h-4 w-4" />
                                    Accept
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={() => {
                                        socket?.send(JSON.stringify({
                                            type: "draw_result",
                                            result: false,
                                            gameId
                                        }));
                                        setIsPopoverOpen(false);
                                    }}
                                >
                                    <X className="mr-1 h-4 w-4" />
                                    Decline
                                </Button>
                            </div>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
                        onClick={() => {
                            socket?.send(JSON.stringify({
                                type: "draw",
                                gameId
                            }));
                        }}
                    >
                        <Flag className="mr-2 h-4 w-4" />
                        Offer Draw
                    </Button>

                    <Button
                        variant="outline"
                        className="bg-transparent border-gray-600 text-white hover:bg-gray-700"
                        onClick={() => {
                            socket?.send(JSON.stringify({
                                type: "resign",
                                gameId
                            }));
                        }}
                    >
                        <Flag className="mr-2 h-4 w-4 text-red-500" />
                        Resign
                    </Button>
                </div>
                <div className="p-2">
                    <ScrollArea className="h-[180px] mb-2">
                        <div className="flex flex-col gap-1">
                            {messages.map((msg, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <span className="font-semibold text-yellow-400 text-xs">{msg.username}:</span>
                                    <span className="text-xs text-white">{msg.message}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="flex items-center gap-2 mt-2 border-t border-gray-700 pt-2">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-[#272729] border-none text-white text-sm"
                            placeholder="Type a message..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && message.trim()) {
                                    socket?.send(JSON.stringify({
                                        type: "send_message",
                                        gameId,
                                        message
                                    }));
                                    setMessage("");
                                }
                            }}
                        />
                        <Button
                            size="sm"
                            className="bg-[#272729] hover:bg-gray-600"
                            onClick={() => {
                                if (message.trim()) {
                                    socket?.send(JSON.stringify({
                                        type: "send_message",
                                        gameId,
                                        message
                                    }));
                                    setMessage("");
                                }
                            }}
                        >
                            <Send className="h-4 w-4 text-green-400" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovesTable;