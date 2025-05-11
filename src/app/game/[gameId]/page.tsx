import {getGame} from "@/app/game/actions";
import ReplayGame from "@/app/game/_components/replay-game";

const Page = async (props : {params : Promise<{gameId : string}>}) => {
    const params = await props.params
    const {gameId} = params

    const moves = await getGame(gameId);

    return <ReplayGame moves={moves}/>
}

export default Page