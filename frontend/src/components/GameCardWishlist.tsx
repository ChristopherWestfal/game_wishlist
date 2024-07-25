import {ApiGame} from "../types/GameTypes.ts";
import Modal from 'react-modal'
import "../styles/GameCard.css"
import {useState} from "react";

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

    return (
        <>
            <article className="item-card">
                <p>{props.game.name}</p>
                <p>Released: {props.game.released}</p>
                <p>{note}</p>
                <button onClick={handleAddNote}>Add/Edit Note</button>
                <button onClick={handleShowNote}>Show Note</button>
                <button onClick={handleDeleteById}>Delete from List</button>
            </article>

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