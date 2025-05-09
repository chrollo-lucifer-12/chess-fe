import Hero from "@/app/(website)/_components/hero";
import LiveGames from "@/app/(website)/_components/live-games";
import {getLiveGames} from "@/app/(website)/actions";
import Features from "@/app/(website)/_components/features";
import Footer from "@/app/(website)/_components/footer";

const HomePage = async () => {
    const games = await getLiveGames();

    return (
        <div className="w-full">
            <Hero />
            <LiveGames games={games} />
            <Features />
            <Footer/>
        </div>
    );
}

export default HomePage;