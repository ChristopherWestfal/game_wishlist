import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import GamelistPage from "./pages/GamelistPage.tsx";
import axios from "axios";
import {SyntheticEvent, useEffect, useState} from "react";
import {ApiGame} from "./types/GameTypes.ts";
import WishlistPage from "./pages/WishlistPage.tsx";
import {Alert, Snackbar} from '@mui/material';
import Box from "@mui/material/Box";

function App() {

    const [apiGames, setApiGames] = useState<ApiGame[]>([]);
    const [wishedGames, setWishedGames] = useState<ApiGame[]>([]);
    const [next, setNext] = useState<string | null>(null)
    const [prev, setPrev] = useState<string | null>(null)

    const [open, setOpen] = useState<boolean>(false);
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [message, setMessage] = useState<string>('');
    const [count, setCount] = useState<number>(0)

    const handleClick = (severity: 'success' | 'error' | 'warning' | 'info', message: string) => {
        setSeverity(severity);
        setMessage(message);
        setOpen(true);
    };

    const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };




    function getAllApiGames() {
        axios.get("/api/apigames")
            .then(response => {
                setNext(response.data.next);
                setPrev(response.data.previous);
                setApiGames(response.data.results);
                setCount(response.data.count);
            })
            .catch(error => console.error("No API available", error))
    }

    function getAllApiGamesNext() {
        axios.get("/api/apigames/next")
            .then(response => {
                setNext(response.data.next);
                setPrev(response.data.previous);
                setApiGames(response.data.results);
            })
            .catch(error => console.error("No API available", error))
    }

    function getAllApiGamesPrev() {
        axios.get("/api/apigames/prev")
            .then(response => {
                setNext(response.data.next);
                setPrev(response.data.previous);
                setApiGames(response.data.results);
            })
            .catch(error => console.error("No API available", error))
    }

    function getAllWishedGames() {
        axios.get("/api/wishlist")
            .then(response => {
                setWishedGames(response.data);
            })
            .catch(error => console.error("No Database available", error))
    }

    function deleteById(id:number){
        axios.delete(`/api/wishlist/${id}`)
            .then(() => {
                getAllWishedGames();
                handleClick('success', "Game successfully discarded");
            })
            .catch(error => console.error("No game with such ID in wishlist", error))
    }

    function postGame(game:ApiGame){
        axios.post("api/wishlist", game)
            .then(response => {
                if(JSON.stringify(response.data !== null)) {
                    handleClick('success', "Game successfully added");
                }
            })
            .then(getAllWishedGames)
            .catch(error => {
                handleClick('warning', "Game already added");
                console.error("Game already added", error)
            })
    }

    function putGame(id:number, note:string){
        axios.put(`/api/wishlist?id=${id}&note=${note}`)
            .then(getAllWishedGames)
            .catch(error => console.error("No game with such ID in wishlist", error))
    }

    useEffect(() => {
        getAllApiGames();
        getAllWishedGames()
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <GamelistPage games={apiGames} postGame={postGame} next={next} prev={prev} getAllApiGamesNext={getAllApiGamesNext} getAllApiGamesPrev={getAllApiGamesPrev} count={count}/>
        },
        {
            path: "/wishlist",
            element: <WishlistPage games={wishedGames} deleteById={deleteById} putGame={putGame}/>
        },

    ])

    return (
        <>
            <RouterProvider router={router}/>

            <Box sx={{ width: 500 }}>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert
                        severity={severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
}

export default App
