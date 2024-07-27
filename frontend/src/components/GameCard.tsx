import {ApiGame} from "../types/GameTypes.ts";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";

type GameCardProps = {
    game:ApiGame
    postGame: (game: ApiGame) => void
}

export default function GameCard(props: Readonly<GameCardProps>) {
    function handleFav() {
        props.game.note = "Place for a Note";
        props.game.fav = true;
        props.postGame(props.game);
    }

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.game.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Release: {props.game.released}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleFav}>Add to List</Button>
            </CardActions>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: 300 }}>
            <Card sx={{ maxWidth: 100 + "%", height: 140 }}>{card}</Card>
        </Box>
    );
}