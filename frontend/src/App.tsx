import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {Game} from "./types/GameTypes.ts";

function App() {

    const [games, setGames] = useState<Game[]>([]);

    function getAllGames() {
        axios.get("/api")
            .then(response => {
                setGames(response.data);
            })
        .catch(error => console.error("Something went wrong", error))
    }

    useEffect(() => {
        getAllGames();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage games={games}/>
        }

    ])

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
