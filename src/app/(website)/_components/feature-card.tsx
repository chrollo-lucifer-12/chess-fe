"use client"

import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
    icon: LucideIcon
    title: string
    content: string
}

const FeatureCard = ({ icon: Icon, content, title }: FeatureCardProps) => {
    return (
        <div className="p-6 rounded-xl border-1 border-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start">
            <Icon className="w-6 h-6 text-white" />
            <p className="text-white font-bold text-xl">{title}</p>
            <p className="text-sm text-zinc-400">{content}</p>
        </div>
    )
}

export default FeatureCard