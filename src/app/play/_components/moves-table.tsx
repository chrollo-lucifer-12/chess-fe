"use client"

import {Button} from "@/components/ui/button";
import {Check, Flag, X} from "lucide-react";
import {useSocketState} from "@/lib/store";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import {Input} from "@/components/ui/input";

interface MovesTableProps {
    isPopOverOpen : boolean
    setIsPopoverOpen : (res : boolean) => void
    gameId : string
    messages : {username : string, message : string} []
}

const MovesTable = ({isPopOverOpen, setIsPopoverOpen, gameId, messages} : MovesTableProps) => {

    const socket = useSocketState();
    const [message, setMessage] = useState("")

    return <div className={"bg-[#272729] w-[400px] rounded"}>
        <div className={"flex flex-col items-center justify-center gap-x-2"}>
            <h1 className={"font-bold text-xl text-white"}>Moves Table</h1>
            <div className={"w-full border border-black"}/>
            <div className={"h-[400px] w-full"}>

            </div>
            <div className={"flex gap-x-6"}>
                {
                    isPopOverOpen && (
                        <Label htmlFor={"draw_button"}
                               className={"bg-[#272729] border-none flex items-center justify-between text-sm text-white"}>
                            <p>Accept Draw?</p>
                            <div className={"flex gap-x-2"}>
                                <Button onClick={() => {
                                    socket?.send(JSON.stringify({
                                        type: "draw_result",
                                        result: true,
                                        gameId
                                    }));
                                    setIsPopoverOpen(false);
                                }}>
                                    <Check/>
                                </Button>
                                <Button onClick={() => {
                                    socket?.send(JSON.stringify({
                                        type: "draw_result",
                                        result: false,
                                        gameId
                                    }));
                                    setIsPopoverOpen(false);
                                }}>
                                    <X/>
                                </Button>
                            </div>
                        </Label>)
                }
                <Button id={"draw_button"} onClick={() => {
                    socket?.send(JSON.stringify({
                        type: "draw",
                        gameId
                    }));
                }}>
                    <Flag/>
                    <p>Draw</p>
                </Button>

                <Button onClick={() => {
                    socket?.send(JSON.stringify({
                        type: "resign",
                        gameId
                    }))
                }}>
                    <Flag/>
                    <p className={"font-bold"}>Resign</p>
                </Button>
            </div>
            <div className={"w-full border border-black"}/>
            <div className="h-[260px] w-full flex flex-col p-2">
                <ScrollArea className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-y-1">
                        {
                            messages.map((message, i) => (
                                <div key={i} className="flex items-center gap-x-2">
                                    <p className="font-bold text-yellow-400 text-xs">{message.username}:</p>
                                    <p className="text-xs text-white">{message.message}</p>
                                </div>
                            ))
                        }
                    </div>
                </ScrollArea>
                <div className="flex items-center gap-2 mt-2">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 border-none text-white h-4"
                        placeholder={"type a message..."}
                    />
                    <Button variant={"ghost"} onClick={() => {
                        socket?.send(JSON.stringify({
                            type: "send_message",
                            gameId,
                            message
                        }))
                        setMessage("")

                    }} className={"text-green-400 hover:bg-transparent hover:text-green-400 h-4"}>
                        Send
                    </Button>
                </div>
            </div>

        </div>
    </div>
}

export default MovesTable;
