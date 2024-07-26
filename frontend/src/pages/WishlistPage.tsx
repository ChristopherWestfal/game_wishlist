import {ApiGame} from "../types/GameTypes.ts";
import "../styles/ShowGameCardPages.css"
import GameCardWishlist from "../components/GameCardWishlist.tsx";
import Header from "../components/Header.tsx";

type WishlistPageProps = {
    games: ApiGame[],
    deleteById: (id: number) => void,
    putGame:(id: number, note: string) => void
}


export default function WishlistPage(props: Readonly<WishlistPageProps>) {

    return (
        <>
            <Header/>
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