import WatchClient from "@/app/watch/_components/watch-client";
import {getCurrentSession} from "@/lib/cookie";
import {redirect} from "next/navigation";

const WatchPage = async (props : {params : Promise<{gameId : string}>}) => {
    const params = await props.params;
    const {gameId} = params;

    const {user, session} = await getCurrentSession();

    if (!session) {
       return redirect("/login")
    }

    return <WatchClient gameId={gameId} username={user.username}/>
}

export default WatchPage;