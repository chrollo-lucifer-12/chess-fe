import Hero from "@/app/(website)/_components/hero";
import LiveGames from "@/app/(website)/_components/live-games";
import {getLiveGames} from "@/app/(website)/actions";

const HomePage = async () => {

    const games = await getLiveGames();

    return <div className={""}>
        <Hero/>
        <LiveGames games={games}/>
    </div>
}

export default HomePage