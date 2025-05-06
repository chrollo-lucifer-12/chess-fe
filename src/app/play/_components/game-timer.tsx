"use client"

import Image from "next/image";
import {findSrc} from "@/lib/definitions";
import {useOpponent} from "@/lib/store";
import {User} from "@prisma/client";


interface GameTimerProps{
    user : User
    capturedPieces : string[]
    opponentCapturedPieces : string[]
}

const GameTimer = ({user,opponentCapturedPieces,capturedPieces  } : GameTimerProps) => {

    const opponent = useOpponent()

    return <div className={"h-full w-[15%] flex flex-col items-center justify-between text-white gap-y-2"}>
        <div className={"flex flex-col justify-between items-center gap-x-6 w-full h-[50%]"}>
            <div className={"flex gap-x-6 items-center"}>
                <p className={"font-bold text-md ml-2"}>{opponent}</p>
                <div className={"flex flex-col"}>
                    {
                        opponentCapturedPieces.slice(0, 5).map((piece) => (
                            <Image src={findSrc(piece)!} alt={"captured"} width={8} height={8}/>
                        ))
                    }
                </div>
            </div>
            <div className={"w-20 h-10 bg-[#272729] rounded-md flex justify-center items-center"}>
                <p className={"font-bold"}>10:00</p>
            </div>
        </div>
        <div className={"flex flex-col justify-between items-center gap-x-6 w-full h-[50%]"}>
            <div className={"w-20 h-10 bg-[#272729] rounded-md flex justify-center items-center"}>
                <p className={"font-bold"}>10:00</p>
            </div>
            <div className={"flex gap-x-6 items-center"}>
                <p className={"font-bold text-md ml-2"}>{user.username}</p>
                <div className={"flex flex-col"}>
                    {
                        capturedPieces.slice(0, 5).map((piece) => (
                            <Image src={findSrc(piece)!} alt={"captured"} width={8} height={8}/>
                        ))
                    }
                </div>
            </div>

        </div>
    </div>
}


export default GameTimer