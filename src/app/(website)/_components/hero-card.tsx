"use client"

import { LucideIcon } from "lucide-react"

interface HeroCardProps {
    icon : LucideIcon
    title : string
    subtitle : string
}

const HeroCard = ({icon : Icon, subtitle, title} : HeroCardProps) => {
    return <div className={"rounded-md flex flex-col gap-y-1 bg-[#29333f] p-4 pt-2 pb-2 w-[180px] border border-[#403f45]"}>
        <div className={"flex items-center gap-x-2"}>
            <Icon className={"text-amber-500"} />
            <p className={"text-white font-bold"}>{title}</p>
        </div>
        <p className={"text-xs text-[#838997]"}>{subtitle}</p>
    </div>
}

export default HeroCard