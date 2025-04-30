"use client"

import ChessBoard from "@/components/chess-board";
import {symbol} from "zod";

const Page = () => {
    // wip : chessboard
    return <div className={"bg-black h-screen"}>
        <ChessBoard initialCells={[{coords : {x : 0, y : 0},  symbol : "wp"}]}/>
    </div>
}

export default Page