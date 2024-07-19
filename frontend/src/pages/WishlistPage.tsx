import {Game} from "../types/GameTypes.ts";
import "../styles/ShowGameCardPages.css"
import GameCardWishlist from "../components/GameCardWishlist.tsx";

type WishlistPageProps = {
    games: Game[],
    deleteById: (id: string) => void,
    putGame:(id: string, note: string) => void
}


export default function WishlistPage(props: Readonly<WishlistPageProps>) {

    return (
        <>
            <div className="gallery">
                {
                    props.games.map((game) => <GameCardWishlist
                                                                putGame={props.putGame}
                                                                deleteById={props.deleteById}
                                                                game={game}
                                                                key={game.id}/>)
                }
            </div>
        </>
    );
}