import {ApiGame} from "../types/GameTypes.ts";
import "../styles/GameCard.css"

type GameCardProps = {
    game:ApiGame
    postGame: (game: ApiGame) => void
}

export default function GameCard(props: Readonly<GameCardProps>) {
    function handleFav() {
        props.game.note = "Place for a Note";
        props.game.fav = true;
        props.postGame(props.game);
    }

    return (
        <>
            <article className="item-card">
                <p>{props.game.name}</p>
                <p>{props.game.released}</p>
                <p>Rating: {props.game.rating} / {props.game.rating_top}</p>
                <button onClick={handleFav}>Add to List</button>
            </article>
        </>
    );
}