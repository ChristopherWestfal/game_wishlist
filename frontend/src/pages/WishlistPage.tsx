import {Game} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";
import "../styles/ShowGameCardPages.css"

type WishlistPageProps = {
    games:Game[]
}

export default function WishlistPage(props: Readonly<WishlistPageProps>) {

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