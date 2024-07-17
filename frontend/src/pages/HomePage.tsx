import {Game} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";

type HomePageProps = {
    games:Game[],
}

export default function HomePage(props: Readonly<HomePageProps>) {

    return (
        <>
            {
                props.games.map((game) => <GameCard game={game} key={game.id}/>)
            }
        </>
    );
}