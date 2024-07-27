// import "../styles/Navigation.css"
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <ul>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            <li>
                <Link to={"/wishlist"}>Wishlist</Link>
            </li>
            <li>
                <Link to={"https://rawg.io/"}>Database provided by rawg.io</Link>
            </li>
        </ul>
    )
}