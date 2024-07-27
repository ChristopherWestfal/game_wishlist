import Navigation from "./Navigation.tsx";
// import "../styles/Header.css"

export default function Header () {
    return (
        <>
            <div className="header-container">
                <h1 className="app-header">Game Wishlist</h1>
                <Navigation/>
            </div>
        </>
    );
}