import {Game} from "../types/GameTypes.ts";

type GameCardProps = {
    game:Game
}

export default function GameCard(props: Readonly<GameCardProps>) {
    return (
        <>
            <article className="item-card">
                <p>{props.game.name}</p>
                <p>{props.game.releaseDate}</p>
                <p>{props.game.fav}</p>
            </article>

        </>
    );
}