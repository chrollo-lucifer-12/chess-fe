import WatchClient from "@/app/watch/_components/watch-client";
import {getCurrentSession} from "@/lib/cookie";
import {redirect} from "next/navigation";
import {getGame} from "@/app/watch/actions";

const WatchPage = async (props : {params : Promise<{gameId : string}>}) => {
    const params = await props.params;
    const {gameId} = params;

    const {user, session} = await getCurrentSession();

    if (!session) {
       return redirect("/login")
    }

    const game = await getGame(gameId);

    if (!game)  return;

    return <WatchClient gameId={gameId} username={user.username} game={game}/>
}

export default WatchPage;