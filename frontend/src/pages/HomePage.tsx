import {Game} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";
import "../styles/ShowGameCardPages.css"
import Header from "../components/Header.tsx";

type HomePageProps = {
    games: Game[],
    postGame: (game: Game) => void
}

export default function HomePage(props: Readonly<HomePageProps>) {

    return (
        <>
            <Header/>
            <div className="gallery">
                {
                    props.games.map((game) => <GameCard game={game} key={game.id} postGame={props.postGame}/>)
                }
            </div>
        </>
    );
}