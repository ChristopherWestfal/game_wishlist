import {ApiGame} from "../types/GameTypes.ts";
import Modal from 'react-modal'
import "../styles/Modal.css"
import {useState} from "react";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";

Modal.setAppElement('#root');

type GameCardWishlistProps = {
    game: ApiGame,
    deleteById: (id: number) => void,
    putGame:(id: number, note: string) => void
}

export default function GameCardWishlist(props: Readonly<GameCardWishlistProps>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowNoteModalOpen, setIsShowNoteModalOpen] = useState(false);
    const [note, setNote] = useState(props.game.note);

    function handleDeleteById() {
        props.deleteById(props.game.id);
    }

    function handleAddNote() {
        setIsModalOpen(true);
        if (note === "")
            setNote("")
    }

    function handleSaveNote() {
        if (note === "")
            setNote("Place for a Note")
        props.game.note = note;
        setIsModalOpen(false);
        props.putGame(props.game.id, note);
    }

    function handleCloseModal() {
        if (note === "")
            setNote("Place for a Note")
        setIsModalOpen(false);
    }

    function handleShowNote() {
        setIsShowNoteModalOpen(true);
    }

    function handleCloseShowNoteModal() {
        setIsShowNoteModalOpen(false);
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
                <Button variant="contained" onClick={handleAddNote}>Add/Edit Note</Button>
                <Button variant="contained" onClick={handleShowNote}>Show Note</Button>
                <Button variant="contained" onClick={handleDeleteById}>Delete from List</Button>
            </CardActions>
        </React.Fragment>
    );

    return (
        <>
            <Box sx={{ minWidth: 300 }}>
                <Card sx={{ maxWidth: 100 + "%", height: 170 }}>{card}</Card>
            </Box>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Add Note Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Add a Note</h2>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter your note here..."
                />
                <button onClick={handleSaveNote}>Save Note</button>
                <button onClick={handleCloseModal}>Cancel</button>
            </Modal>

            <Modal
                isOpen={isShowNoteModalOpen}
                onRequestClose={handleCloseShowNoteModal}
                contentLabel="Show Note Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Note</h2>
                <p>{note}</p>
                <button onClick={handleCloseShowNoteModal}>Close</button>
            </Modal>
        </>
    );
}