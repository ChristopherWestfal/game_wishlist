import {ApiGame} from "../types/GameTypes.ts";
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

    const pageName = "Wishlist";

    return (
        <>
            <Box height={50}/>
            <Navbar pageName={pageName}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Typography paragraph>
                        <Grid container spacing={1}>
                            {
                                props.games.map((game) => <Grid item xs={3}> <GameCardWishlist
                                    putGame={props.putGame}
                                    deleteById={props.deleteById}
                                    game={game}
                                    key={game.id}/></Grid>)
                            }
                        </Grid>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}