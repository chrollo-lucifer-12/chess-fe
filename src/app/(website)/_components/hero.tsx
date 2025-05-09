"use client"

import {Button} from "@/components/ui/button";
import {ChevronRight, Circle, Play} from "lucide-react";
import {herocards} from "@/lib/definitions"
import HeroCard from "@/app/(website)/_components/hero-card";
import Link from "next/link";

const Hero = () => {
    return <div className={"bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 p-16 flex gap-x-10 items-center"}>
        <section className={"w-[50%]"}>
            <div className={"text-white font-bold text-5xl leading-tight mb-6 flex flex-col "}>
                <span>
                Elevate Your <span className={"text-amber-600"}>Chess</span>
            </span>
                <span>
                <span className={"text-amber-600"}>Game</span> to the Next
            </span>
                <span className={"mb-2"}>Level</span>
                <span className={"text-sm flex flex-col text-[#cbd2d4]"}>
                <p>Join millions of players worldwide. Play, Learn and</p>
                <p>connect with global chess community</p>
            </span>
            </div>
            <div className={"flex gap-x-6"}>
                <Button className={"bg-amber-600 hover:bg-amber-700 font-bold pl-6 pr-6"}> <Play/> Play Now</Button>
                <Button className={"font-bold pl-6 pr-6"}> <ChevronRight/> Learn Chess</Button>
            </div>
            <div className={"flex mt-6 gap-x-4"}>
                {
                    herocards.map((card,i) => (
                        <HeroCard key={i} icon={card.icon} title={card.title} subtitle={card.subtitle}/>
                    ))
                }
            </div>
        </section>
        <section className={"p-2 rounded-md bg-[#29333f] flex flex-col gap-y-2 ml-[150px] border border-[#403f45]"}>
            <video src={"/chessboard.mp4"} className={"w-[280px] h-[280px] rounded-md"} autoPlay />
            <div className={"flex justify-between"}>
                <span className={"flex items-center gap-x-2"}>
                    <Circle className={"text-green-300 w-4 h-4"}/>
                    <p className={"text-xs text-white font-bold"}>1243 Players online</p>
                </span>
                <Link href={"/home"} className={"text-xs text-amber-500 font-bold"}>Join a game</Link>
            </div>
        </section>
    </div>
}

export default Hero