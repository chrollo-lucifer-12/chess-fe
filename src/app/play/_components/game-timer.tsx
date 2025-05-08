"use client"
import Image from "next/image";
import {useOpponent} from "@/lib/store";
import {User} from "@prisma/client";


interface GameTimerProps{
    user : User
    capturedPieces : string[]
    opponentCapturedPieces : string[]
}

const GameTimer = ({user} : GameTimerProps) => {

    const opponent = useOpponent()

    return <div className={"h-full w-[15%] flex flex-col items-center justify-between text-white gap-y-2"}>
        <div className={"flex flex-col justify-between items-center gap-x-6 w-full h-[50%]"}>
            <div
                className={"flex items-center gap-x-6 bg-[#272729] rounded w-full pl-2 pr-2 pt-1 pb-1 ml-4 mr-4 mt-2 ring-1 ring-green-400"}>
                <Image src={"/black_rook.png"} alt={"image"} height={20} width={20} className={""}/>
                <div className={"flex flex-col items-center justify-between"}>
                    <p className={"font-bold text-md ml-2"}>{opponent}</p>
                    <p>1200</p>
                </div>
            </div>
            <div className={"w-20 h-10 bg-[#272729] rounded-md flex justify-center items-center ring-1 ring-green-400"}>
                <p className={"font-bold"}>10:00</p>
            </div>
        </div>
        <div className={"flex flex-col justify-between items-center gap-x-6 w-full h-[50%]"}>
            <div className={"w-20 h-10 bg-[#272729] rounded-md flex justify-center items-center ring-1 ring-green-400"}>
                <p className={"font-bold"}>10:00</p>
            </div>
            <div
                className={"flex items-center gap-x-6 bg-[#272729] rounded w-full pl-2 pr-2 pt-1 pb-1 ml-4 mr-4 mt-2 ring-1 ring-green-400"}>
                <Image src={"/black_rook.png"} alt={"image"} height={20} width={20} className={""}/>
                <div className={"flex flex-col items-center justify-between"}>
                    <p className={"font-bold text-md ml-2"}>{user.username}</p>
                    <p>1200</p>
                </div>
            </div>
        </div>
    </div>
}


export default GameTimer