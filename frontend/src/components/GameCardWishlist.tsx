import {Game} from "../types/GameTypes.ts";
import  Modal from 'react-modal'
import "../styles/GameCard.css"
import {useState} from "react";

Modal.setAppElement('#root');

type GameCardWishlistProps = {
    game:Game
    deleteById: (id:string) => void
}

export default function GameCardWishlist(props: Readonly<GameCardWishlistProps>) {
    const[isModalOpen, setIsModalOpen] = useState(false);
    const[isShowNoteModalOpen, setIsShowNoteModalOpen] = useState(false);
    const[note, setNote] = useState("Place for a Note");

    function handleDeleteById() {
        props.deleteById(props.game.id);
    }

    function handleAddNote(){
        setIsModalOpen(true);
        if(note === "")
            setNote("")
    }

    function handleSaveNote(){
        console.log(("Note saved: " + note));
        if(note === "")
            setNote("Place for a Note")
        props.game.note = note;
        console.log(props.game);
        setIsModalOpen(false);
    }

    function handleCloseModal() {
        if(note === "")
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
                <p>{props.game.releaseDate}</p>
                <p>{note}</p>
                <button onClick={handleAddNote}>Add Note</button>
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