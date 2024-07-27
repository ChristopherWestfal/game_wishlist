import {ApiGame} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";
import "../styles/ShowGameCardPages.css"
import Sidenav from "../components/Sidenav.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar.tsx";

type HomePageProps = {
    games: ApiGame[],
    postGame: (game: ApiGame) => void,
    next: string|null,
    prev:string|null,
    getAllApiGamesNext: () => void,
    getAllApiGamesPrev: () => void,
}

export default function HomePage(props: Readonly<HomePageProps>) {

    function handleNext(){
        props.getAllApiGamesNext();
    }

    function handlePrev(){
        props.getAllApiGamesPrev();
    }

    return (
        <>
            <Navbar/>
            <Box height={50}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Typography paragraph>
                        <div className="gallery">
                            {
                                props.games.map((game) => <GameCard game={game} key={game.id} postGame={props.postGame}/>)
                            }
                        </div>

                        <div>
                            <button onClick={handlePrev} disabled={props.prev === ""}>Previous</button>
                            <button onClick={handleNext} disabled={props.next === ""}>Next</button>
                        </div>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}