"use client"

import Image from "next/image";
import {sidebarlinks} from "@/lib/definitions";
import {SettingsIcon} from "lucide-react";

const Sidebar = () => {
    return <aside className={"flex flex-col justify-between h-full items-center w-full"}>
        <div>
            <Image src={"/logo.svg"} alt={"logo"} width={30} height={30} className={"w-[100px] mt-3"}/>
            <div className={"mt-4 flex flex-col gap-y-2 items-center w-full"}>
                {
                    sidebarlinks.map((link) => (
                        <div key={link.name}
                             className={"flex hover:bg-black gap-x-4 w-full p-3 items-center transition duration-200 rounded"}>
                            <Image src={link.src} alt={link.name} width={20} height={20}/>
                            <p className={"text-white font-bold"}>{link.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className={"mb-3"}>
            <span className={"text-[#7D7C7A] flex items-center gap-x-2"}>
                <SettingsIcon className={"w-8"}/>
                <p className={"text-xs"}>Settings</p>
            </span>
        </div>
    </aside>
}

export default Sidebar