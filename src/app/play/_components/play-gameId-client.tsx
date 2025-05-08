"use client"

import {useColor, useSocketState} from "@/lib/store";
import ChessBoard, {CellType} from "@/components/chess-board";
import { initialCells} from "@/lib/definitions";
import {User} from "@prisma/client";
import {useEffect, useState} from "react";
import GameTimer from "@/app/play/_components/game-timer";
import MovesTable from "@/app/play/_components/moves-table";

interface PlayGameIdClientProps {
    gameId : string
    user : User
}

const PlayGameIdClient = ({gameId, user} : PlayGameIdClientProps) => {
    const color = useColor()
    const socket = useSocketState();
    const [capturedPieces, setCapturedPieces] = useState<string[]>([]);
    const [opponentCapturedPieces, setOpponentCapturedPieces] = useState<string[]>([])
    const [cells, setCells] = useState<CellType[]>(initialCells);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
        if (socket) {
            socket.addEventListener("message", (e) => {
                const parsedData = JSON.parse(e.data);
                console.log(parsedData);
                if (parsedData.type === "move_made") {
                    const {capturedPiece} = parsedData.payload;
                    if (capturedPiece) {
                        if (capturedPiece[0] === color) {
                            setOpponentCapturedPieces(prevState => [capturedPiece, ...prevState]);
                        }
                        else {
                            setCapturedPieces(prevState => [capturedPiece, ...prevState]);
                        }
                    }
                    setCells(parsedData.payload.board);
                }
                else if (parsedData.type === "stalemate") {
                    setIsDialogOpen(true);
                }
                else if (parsedData.type === "game_over") {
                    setIsDialogOpen(true);
                }
                else if (parsedData.type === "resign") {
                    setIsDialogOpen(true);
                }
                else if (parsedData.type === "draw_offered") {
                    setIsPopoverOpen(true);
                }
            })
        }
    },[socket])

    return <div className={"flex p-2 h-full w-full gap-x-6"}>
        <GameTimer user={user} capturedPieces={capturedPieces} opponentCapturedPieces={opponentCapturedPieces}/>
        <ChessBoard cells={cells} isStatic={false} gameId={gameId as string} color={color!}
                    setCapturedPieces={setCapturedPieces} setOpponentCapturedPieces={setOpponentCapturedPieces}/>
        <MovesTable gameId={gameId} isPopOverOpen={isPopoverOpen} setIsPopoverOpen={setIsPopoverOpen} />
    </div>
}


export default PlayGameIdClient