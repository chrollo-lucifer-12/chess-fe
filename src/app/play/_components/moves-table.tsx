"use client"

import {Button} from "@/components/ui/button";
import {Check, Flag, X} from "lucide-react";
import {useSocketState} from "@/lib/store";
import {
    Popover,
    PopoverContent,
} from "@/components/ui/popover"
import {Label} from "@/components/ui/label";

interface MovesTableProps {
    isPopOverOpen : boolean
    setIsPopoverOpen : (res : boolean) => void
    gameId : string
}

const MovesTable = ({isPopOverOpen, setIsPopoverOpen, gameId} : MovesTableProps) => {

    const socket = useSocketState();

    return <div className={"bg-[#272729] w-[400px] rounded"}>
        <div className={"flex flex-col items-center justify-center gap-x-2"}>
            <h1 className={"font-bold text-xl text-white"}>Moves Table</h1>
            <div className={"w-full border border-black"}/>
            <div className={"h-[400px] w-full"}>
                moves
            </div>
            <div className={"flex gap-x-6"}>
                {
                    isPopOverOpen && (
                        <Label htmlFor={"draw_button"} className={"bg-[#272729] border-none flex items-center justify-between text-sm text-white"}>
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
        </div>
    </div>
}

export default MovesTable;
