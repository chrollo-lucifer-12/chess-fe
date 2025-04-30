"use client"

import {useSocketState} from "@/lib/store";
import {useParams} from "next/navigation";

const Page =  () => {

    const socket = useSocketState()
    const {gameId} = useParams()

    console.log(gameId);

    return <div>

    </div>
}

export default Page