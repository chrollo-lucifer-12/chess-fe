"use client"

import {Button} from "@/components/ui/button";
import {ChevronRight, Circle, Play} from "lucide-react";
import {herocards} from "@/lib/definitions"
import HeroCard from "@/app/(website)/_components/hero-card";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 p-4 md:p-8 lg:p-16 flex flex-col lg:flex-row gap-y-8 lg:gap-x-10 items-center">
            <section className="w-full lg:w-1/2">
                <div className="text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 flex flex-col">
                    <span>
                        Elevate Your <span className="text-amber-600">Chess</span>
                    </span>
                    <span>
                        <span className="text-amber-600">Game</span> to the Next
                    </span>
                    <span className="mb-2">Level</span>
                    <span className="text-xs md:text-sm flex flex-col text-[#cbd2d4]">
                        <p>Join millions of players worldwide. Play, Learn and</p>
                        <p>connect with global chess community</p>
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:gap-x-6 mb-6">
                    <Button className="bg-amber-600 hover:bg-amber-700 font-bold pl-6 pr-6 w-full sm:w-auto">
                        <Play className="mr-2"/> Play Now
                    </Button>
                    <Button className="font-bold pl-6 pr-6 w-full sm:w-auto">
                        <ChevronRight className="mr-2"/> Learn Chess
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        herocards.map((card, i) => (
                            <HeroCard key={i} icon={card.icon} title={card.title} subtitle={card.subtitle}/>
                        ))
                    }
                </div>
            </section>
            <section className="p-2 rounded-md bg-[#29333f] flex flex-col gap-y-2 lg:ml-[50px] xl:ml-[150px] border border-[#403f45] w-full max-w-[320px] mx-auto lg:mx-0">
                <video src={"/chessboard.mp4"} className="w-full aspect-square rounded-md" autoPlay muted loop playsInline />
                <div className="flex justify-between">
                    <span className="flex items-center gap-x-2">
                        <Circle className="text-green-300 w-4 h-4"/>
                        <p className="text-xs text-white font-bold">1243 Players online</p>
                    </span>
                    <Link href={"/home"} className="text-xs text-amber-500 font-bold">Join a game</Link>
                </div>
            </section>
        </div>
    );
}

export default Hero;