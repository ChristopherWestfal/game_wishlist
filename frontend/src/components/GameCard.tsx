import {Game} from "../types/GameTypes.ts";
import "../styles/GameCard.css"

type GameCardProps = {
    game:Game
}

export default function GameCard(props: Readonly<GameCardProps>) {
    return (
        <>
            <article className="item-card">
                <p>{props.game.name}</p>
                <p>{props.game.releaseDate}</p>
                <p>{"Fav: " + props.game.fav}</p>

            </article>

        </>
    );
}