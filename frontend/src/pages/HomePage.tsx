import {Game} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";
import "../styles/HomePage.css"

type HomePageProps = {
    games:Game[],
}

export default function HomePage(props: Readonly<HomePageProps>) {

    return (
        <>
            <div className="gallery">
            {
                props.games.map((game) => <GameCard game={game} key={game.id}/>)
            }
            </div>
        </>
    );
}