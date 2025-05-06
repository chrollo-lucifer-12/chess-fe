"use client"

import {useColor, useOpponent, useSocketState} from "@/lib/store";
import ChessBoard from "@/components/chess-board";
import {findSrc, initialCells} from "@/lib/definitions";
import {User} from "@prisma/client";
import {useState} from "react";
import Image from "next/image";

interface PlayGameIdClientProps {
    gameId : string
    user : User
}

const PlayGameIdClient = ({gameId, user} : PlayGameIdClientProps) => {
    const socket = useSocketState()
    const color = useColor()

    const [capturedPieces, setCapturedPieces] = useState<string[]>([]);
    const [opponentCapturedPieces, setOpponentCapturedPieces] = useState<string[]>([])

    return <div className={"flex p-2 h-full w-full items-center"}>

        <ChessBoard initialCells={initialCells} isStatic={false} gameId={gameId as string} color={color!}
                    setCapturedPieces={setCapturedPieces} setOpponentCapturedPieces={setOpponentCapturedPieces}/>
    </div>
}


export default PlayGameIdClient