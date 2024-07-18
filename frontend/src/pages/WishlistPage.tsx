import {Game} from "../types/GameTypes.ts";
import "../styles/ShowGameCardPages.css"
import GameCardWishlist from "../components/GameCardWishlist.tsx";

type WishlistPageProps = {
    games:Game[]
    deleteById: (id:string) => void
}


export default function WishlistPage(props: Readonly<WishlistPageProps>) {

    return (
        <>
            <div className="gallery">
            {
                props.games.map((game) => <GameCardWishlist deleteById={props.deleteById} game={game} key={game.id}/>)
            }
            </div>
        </>
    );
}