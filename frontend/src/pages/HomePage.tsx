import {ApiGame} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";
import "../styles/ShowGameCardPages.css"
import Header from "../components/Header.tsx";

type HomePageProps = {
    games: ApiGame[],
    postGame: (game: ApiGame) => void

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

            <div>
                <button >Previous</button>
                <button >Next</button>
            </div>
        </>
    );
}