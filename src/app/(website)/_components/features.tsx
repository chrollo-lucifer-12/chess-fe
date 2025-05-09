"use client"

import {featureCards} from "@/lib/definitions";
import FeatureCard from "@/app/(website)/_components/feature-card";

const Features = () => {
    return <div className={"p-16 text-white"}>
        <h1 className={"font-bold text-2xl text-center"}>Everything You Need to Master Chess</h1>
        <h2 className={"text-center text-xs"}>Our platform offers all the tools and resources you need to improve your game, from beginner to grandmaster.</h2>
        <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"}>
            {
                featureCards.map((card,index) => (
                    <FeatureCard key={index} icon={card.icon} title={card.title} content={card.content}/>
                ))
            }
        </div>
    </div>
}

export default Features