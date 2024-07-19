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
        .catch(error => console.error("Something went wrong", error))
    }

    function getAllWishedGames() {
        axios.get("/api/wishlist")
            .then(response => {
                setWishedGames(response.data);
            })
            .catch(error => console.error("Something went wrong", error))
    }

    function deleteById(id:string){
        axios.delete(`/api/wishlist/${id}`)
            .then(getAllWishedGames)
            .catch(error => console.error("Something went wrong", error))
    }

    function postGame(game:Game){
        axios.post("api/wishlist", game)
            .then(getAllWishedGames)
            .catch(error => console.error("Something went wrong", error))
        console.log(game)
    }

    function putGame(id:string, note:string){
        axios.put(`/api/wishlist?id=${id}&note=${note}`)
            .then(getAllWishedGames)
            .catch(error => console.error("Something went wrong", error))
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
