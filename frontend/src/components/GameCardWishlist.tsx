import {ApiGame} from "../types/GameTypes.ts";
import Modal from 'react-modal'
import "../styles/Modal.css"
import {useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";

Modal.setAppElement('#root');

type GameCardWishlistProps = {
    game: ApiGame,
    deleteById: (id: number) => void,
    putGame:(id: number, note: string) => void,
}

export default function GameCardWishlist(props: Readonly<GameCardWishlistProps>) {
    const [note, setNote] = useState(props.game.note);
    const [openEditNote, setOpenEditNote] = useState(false);
    const [openShowNote, setOpenShowNote] = useState(false);


    function handleDeleteById() {
        props.deleteById(props.game.id);
    }

    function handleAddNote() {
        setOpenEditNote(true);
        if (note === "")
            setNote("")
    }

    function handleSaveNote() {
        if (note === "")
            setNote("Place for a Note")
        props.game.note = note;
        setOpenEditNote(false);
        props.putGame(props.game.id, note);
    }

    function handleCloseModal() {
        if (note === "")
            setNote("Place for a Note")
        setOpenEditNote(false);
    }

    function handleShowNote() {
        setOpenShowNote(true);
    }

    function handleCloseShowNoteModal() {
        setOpenShowNote(false);
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
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Note: {note}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleAddNote}>Add Note</Button>
                <Button variant="contained" onClick={handleShowNote}>Show Note</Button>
                <Button variant="contained" color="error" onClick={handleDeleteById}>Discard from List</Button>
            </CardActions>
        </React.Fragment>
    );

    return (
        <>
            <Box sx={{ minWidth: 300 }}>
                <Card sx={{ maxWidth: 100 + "%" }}>{card}</Card>
            </Box>

            <Dialog open={openEditNote} fullWidth>
                <DialogTitle>Add Note</DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-textarea"
                        value={note}
                        placeholder="Enter your note here..."
                        multiline
                        onChange={(e) => setNote(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={handleSaveNote}>Save Note</Button>
                    <Button variant="contained" color="error" onClick={handleCloseModal}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openShowNote} fullWidth>
                <DialogTitle>Note</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {note}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleCloseShowNoteModal}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}