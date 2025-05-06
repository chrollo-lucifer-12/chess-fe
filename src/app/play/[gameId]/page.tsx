"use client"

import {useColor, useOpponent, useSocketState} from "@/lib/store";
import {useParams} from "next/navigation";
import ChessBoard from "@/components/chess-board";
import {initialCells} from "@/lib/definitions";

const Page =  () => {

    const socket = useSocketState()
    const color = useColor()
    const opponent = useOpponent()
    const {gameId} = useParams()

    return <div>
        <ChessBoard initialCells={initialCells} isStatic={false} gameId = {gameId} />
    </div>
}

export default Page