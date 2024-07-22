import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {Game} from "./types/GameTypes.ts";
import WishlistPage from "./pages/WishlistPage.tsx";

function App() {

    const [apiGames, setApiGames] = useState<Game[]>([]);
    const [wishedGames, setWishedGames] = useState<Game[]>([]);

    function getAllApiGames() {
        axios.get("http://localhost:3000/info")
            .then(response => {
                setApiGames(response.data.games);
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

    function postGame(game:Game){
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
            element: <HomePage games={apiGames} postGame={postGame}/>
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
