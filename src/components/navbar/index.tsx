"use client"

import Image from "next/image";
import {sidebarlinks} from "@/lib/definitions";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {User} from "@prisma/client";
import UserAvatar from "@/components/navbar/user-avatar";
import {useRouter} from "next/navigation";

interface NavbarProps {
    user : User | null
}

const Navbar = ({user} : NavbarProps) => {

    const router = useRouter()

    return <aside className={"flex justify-between items-center w-full pt-1 pb-1 pr-8 pl-8 border-b-1 border-[#262626] sticky top-0 z-50"}>
        <Image src={"/logo.svg"} alt={"logo"} width={30} height={30} className={"w-[100px] mt-3"}/>
        <div className={"mt-4 flex  gap-y-2 items-center"}>
            {
                sidebarlinks.map((link) => (
                    <div key={link.name}
                         className={"flex hover:bg-black gap-x-4 w-full p-3 items-center transition duration-200 rounded"}>

                        <Link href={link.href} className={"text-[#A3A3A3] text-md font-bold hover:text-[#D97706] transition duration-200"}>{link.name}</Link>
                    </div>
                ))
            }
        </div>
        <div >
            {
                !user ? (<div className={"flex gap-x-4"}>
                    <Button onClick={() => {
                        router.push("/login")
                    }}>Login</Button>
                    <Button onClick={() => {
                        router.push("/signup")
                    }} className={"bg-amber-600 hover:bg-amber-700 font-bold"}>Signup</Button>
                </div>) : (<UserAvatar user={user}/>)
            }

        </div>
    </aside>
}

export default Navbar