import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {ApiGame} from "./types/GameTypes.ts";
import WishlistPage from "./pages/WishlistPage.tsx";

function App() {

    const [apiGames, setApiGames] = useState<ApiGame[]>([]);
    const [wishedGames, setWishedGames] = useState<ApiGame[]>([]);
    const [next, setNext] = useState<string | null>(null)
    const [prev, setPrev] = useState<string | null>(null)

    function getAllApiGames() {
        axios.get("/api/apigames")
            .then(response => {
                setNext(response.data.next);
                setPrev(response.data.previous);
                setApiGames(response.data.results);
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

    function deleteById(id:string){
        axios.delete(`/api/wishlist/${id}`)
            .then(response => {
                if(JSON.stringify(response.data !== null))
                    alert("Game successfully deleted");
            })
            .then(getAllWishedGames)
            .catch(error => console.error("No game with such ID in wishlist", error))
    }

    function postGame(game:ApiGame){
        axios.post("api/wishlist", game)
            .then(response => {
                if(JSON.stringify(response.data !== null))
                    alert("Game successfully added");
            })
            .then(getAllWishedGames)
            .catch(error => {
                alert("Game already added");
                console.error("Game already added", error)
            })
    }

    function putGame(id:string, note:string){
        axios.put(`/api/wishlist?id=${id}&note=${note}`)
            .then(response => {
                if(JSON.stringify(response.data !== null))
                    alert("Note successfully added");
            })
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
            element: <HomePage games={apiGames} postGame={postGame} next={next} prev={prev} getAllApiGamesNext={getAllApiGamesNext} getAllApiGamesPrev={getAllApiGamesPrev}/>
        },
        {
            path: "/wishlist",
            element: <WishlistPage games={wishedGames} deleteById={deleteById} putGame={putGame}/>
        },

    ])

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
