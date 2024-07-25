import {ApiGame} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";
import "../styles/ShowGameCardPages.css"
import Header from "../components/Header.tsx";

type HomePageProps = {
    games: ApiGame[],
    postGame: (game: ApiGame) => void,
    next: string|null,
    prev:string|null,
    getAllApiGamesNext: () => void,
    getAllApiGamesPrev: () => void,
}

export default function HomePage(props: Readonly<HomePageProps>) {

    function handleNext(){
        props.getAllApiGamesNext();
    }

    function handlePrev(){
        props.getAllApiGamesPrev();
    }

    return (
        <>
            <Header/>
            <div className="gallery">
                {
                    props.games.map((game) => <GameCard game={game} key={game.id} postGame={props.postGame}/>)
                }
            </div>

            <div>
                <button onClick={handlePrev} disabled={props.prev === ""}>Previous</button>
                <button onClick={handleNext} disabled={props.next === ""}>Next</button>
            </div>
        </>
    );
}