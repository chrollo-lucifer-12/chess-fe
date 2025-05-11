"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useRouter} from "next/navigation";
import {User} from "@prisma/client";

const UserAvatar = ({user} : {user : User}) => {

    const router = useRouter();

    return (
        <div className={"relative group"}>
            <div className={"absolute w-8 h-8 -inset-0 rounded-full group-hover:bg-amber-400 group-hover:blur-md transition duration-200"}/>
            <Avatar className={"cursor-pointer relative group-hover:scale-105 transition duration-200"} onClick={() => {
                router.push(`/user/${user.username}`)
            }}>
                <AvatarImage src={user.avatarUrl!}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default UserAvatar