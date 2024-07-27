import {ApiGame} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";
import Sidenav from "../components/Sidenav.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar.tsx";
import Grid from '@mui/material/Grid';
import {Button} from "@mui/material";

type HomePageProps = {
    games: ApiGame[],
    postGame: (game: ApiGame) => void,
    next: string|null,
    prev:string|null,
    getAllApiGamesNext: () => void,
    getAllApiGamesPrev: () => void,
}

export default function GamelistPage(props: Readonly<HomePageProps>) {

    const pageName = "Gamelist";

    function handleNext(){
        props.getAllApiGamesNext();
    }

    function handlePrev(){
        props.getAllApiGamesPrev();
    }

    return (
        <>
            <Navbar pageName={pageName}/>
            <Box height={50}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Typography paragraph>
                        <Grid container spacing={1}>
                            {
                                props.games.map((game) => <Grid item xs={3}> <GameCard game={game} key={game.id} postGame={props.postGame}/></Grid>)
                            }
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant="contained" onClick={handlePrev} disabled={props.prev === ""}>
                                        Previous
                                    </Button>
                                    <Box sx={{marginTop: '5px'}}>
                                        <span>Seitenzahl</span>
                                    </Box>
                                    <Button variant="contained" onClick={handleNext} disabled={props.next === ""}>
                                        Next
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}