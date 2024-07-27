import {ApiGame} from "../types/GameTypes.ts";
import "../styles/ShowGameCardPages.css"
import GameCardWishlist from "../components/GameCardWishlist.tsx";
import Box from "@mui/material/Box";
import Sidenav from "../components/Sidenav.tsx";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar.tsx";
import Grid from '@mui/material/Grid';

type WishlistPageProps = {
    games: ApiGame[],
    deleteById: (id: number) => void,
    putGame:(id: number, note: string) => void
}


export default function WishlistPage(props: Readonly<WishlistPageProps>) {

    return (
        <>
            <Navbar/>
            <Box height={50}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Typography paragraph>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>

                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                        </Grid>

                        <div className="gallery">
                            {
                                props.games.map((game) => <GameCardWishlist
                                    putGame={props.putGame}
                                    deleteById={props.deleteById}
                                    game={game}
                                    key={game.id}/>)
                            }
                        </div>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}