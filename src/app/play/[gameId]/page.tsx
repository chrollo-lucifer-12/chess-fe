"use client"

import {useColor, useOpponent, useSocketState} from "@/lib/store";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

const Page =  () => {

    const socket = useSocketState()
    const color = useColor()
    const opponent = useOpponent()
    const {gameId} = useParams()




    return <div>
        {color}
        {opponent}
    </div>
}

export default Page