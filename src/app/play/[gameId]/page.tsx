import PlayGameIdClient from "@/app/play/_components/play-gameId-client";
import {getCurrentSession} from "@/lib/cookie";

const Page =  async (props : {params : Promise<{gameId : string}>}) => {
    const params = await props.params;
    const {gameId} = params
    const {user} = await getCurrentSession()

    return <PlayGameIdClient gameId={gameId} user={user!} />
}

export default Page