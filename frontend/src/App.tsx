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
        axios.get("/api")
            .then(response => {
                setApiGames(response.data);
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


    useEffect(() => {
        getAllApiGames();
        getAllWishedGames()
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage games={apiGames}/>
        },
        {
            path: "/wishlist",
            element: <WishlistPage games={wishedGames}/>
        },

    ])

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
