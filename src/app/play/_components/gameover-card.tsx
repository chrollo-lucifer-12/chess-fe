"use client"

import {
    Dialog,
    DialogContent, DialogTitle,
} from "@/components/ui/dialog"
import {Dispatch, SetStateAction, useState} from "react";
import {Button} from "@/components/ui/button";

interface GameoverCardProps {
    isOpen : boolean
    setIsOpen :  Dispatch<SetStateAction<boolean>>
}

const GameoverCard = ({isOpen, setIsOpen} : GameoverCardProps) => {

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className={"w-[350px] bg-[#18181a] border-none text-white flex flex-col items-center"}>
            <h1 className={"text-xl font-bold"}>
                Game Over
            </h1>
            <h2>
                White won
            </h2>
            <Button className={"w-full bg-[#81b64c] hover:bg-[#81b64c] font-bold"}>
                New Game
            </Button>
        </DialogContent>
    </Dialog>

}

export default GameoverCard