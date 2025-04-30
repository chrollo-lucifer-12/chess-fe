import {getCurrentSession} from "@/lib/cookie";
import PlayClient from "@/app/play/_components/play-client";
import {redirect} from "next/navigation";

const Page = async () => {
    const {user} = await getCurrentSession()

    if (!user) {
        redirect("/login")
    }

    return <PlayClient user={user}/>
}

export default Page