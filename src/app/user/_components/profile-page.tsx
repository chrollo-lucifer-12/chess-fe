"use client"

import {Game, User} from "@/lib/definitions";
import Image from "next/image";
import React from "react"
import {useRouter} from "next/navigation";

interface ProfilePageProps {
    games : Game[]
    user : User
}

const ProfilePage = ({games, user} : ProfilePageProps) => {
    const router = useRouter()

    return <div className={"w-full pl-64 pr-64 pt-20 pb-20"}>
        <div className={"bg-[#272729] p-10 flex rounded-md items-center gap-x-10"}>
            <Image src={user.avatarUrl || "/black_king.png"} alt={"user-image"} width={100} height={100}/>
            <p className={"text-white font-semibold"}>{user.username}</p>
        </div>
        <div className={"mt-20 bg-[#272729] p-10 rounded-md"}>
            <p className={"text-white font-bold"}>Games History</p>
            <div className={"mt-16"}>
                {
                  games.length ? games.map((game) => (
                        <React.Fragment key={game.id}>
                        <div className={"flex justify-between items-center p-2"} onClick={() => {
                            router.push(`/game/${game.id}`)
                        }}>
                            <p>{game.username1}</p>
                            <p>vs</p>
                            <p>{game.username2}</p>
                        </div>
                        <div className={"w-full bg-black"}/>
                        </React.Fragment>
                    )) : (<p className={"text-sm text-zinc-500 text-center"}>No games available</p>)
                }
            </div>
        </div>
    </div>
}

export default ProfilePage