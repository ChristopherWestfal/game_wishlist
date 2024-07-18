import {Game} from "../types/GameTypes.ts";
import "../styles/GameCard.css"

type GameCardWishlistProps = {
    game:Game
    deleteById: (id:string) => void
}

export default function GameCardWishlist(props: Readonly<GameCardWishlistProps>) {

    function handleDeleteById() {
        props.deleteById(props.game.id);
    }

    return (
        <>
            <article className="item-card">
                <p>{props.game.name}</p>
                <p>{props.game.releaseDate}</p>
                <p>{"Fav: " + props.game.fav}</p>
                <button onClick={handleDeleteById}>Del</button>

            </article>

        </>
    );
}