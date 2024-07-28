import {ApiGame} from "../types/GameTypes.ts";
import GameCard from "../components/GameCard.tsx";
import Sidenav from "../components/Sidenav.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar.tsx";
import Grid from '@mui/material/Grid';
import {Button} from "@mui/material";
import {useState} from "react";

type GamelistProps = {
    games: ApiGame[],
    postGame: (game: ApiGame) => void,
    next: string|null,
    prev: string|null,
    count: number,
    getAllApiGamesNext: () => void,
    getAllApiGamesPrev: () => void,
}

export default function GamelistPage(props: Readonly<GamelistProps>) {

    const pageName = "Gamelist";
    const [pageNumber, setPageNumber] = useState<number>(1);

    function handleNext(){
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        props.getAllApiGamesNext();
    }

    function handlePrev(){
        setPageNumber(prevPageNumber => prevPageNumber - 1);
        props.getAllApiGamesPrev();
    }

    return (
        <>
            <Navbar pageName={pageName}/>
            <Box height={50}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Typography component="div" paragraph>
                        <Grid container spacing={1}>
                            {
                                props.games.map((game) => (
                                    <Grid item xs={3} key={game.id}> {/* Set the key here */}
                                        <GameCard game={game} postGame={props.postGame} />
                                    </Grid>
                                ))
                            }
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant="contained" onClick={handlePrev} disabled={props.prev === ""}>
                                        Previous
                                    </Button>
                                    <Box sx={{marginTop: '5px'}}>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: '#1565c0',
                                                borderColor: '#1565c0',
                                                cursor: 'default',
                                                '&:hover': {
                                                    borderColor: '#1565c0'
                                                }
                                            }}
                                        >
                                            [ {pageNumber} / {Math.ceil(props.count / 20)} ]
                                        </Button>
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