import {Game} from "../types/GameTypes.ts";
import "../styles/GameCard.css"

type GameCardProps = {
    game:Game
    postGame: (game: Game) => void
}

export default function GameCard(props: Readonly<GameCardProps>) {
    function handleFav() {
        props.game.note = "";
        props.postGame(props.game);
    }

    return (
        <>
            <article className="item-card">
                <p>{props.game.name}</p>
                <p>{props.game.releaseDate}</p>
                <button onClick={handleFav}>Add to List</button>
            </article>

        </>
    );
}