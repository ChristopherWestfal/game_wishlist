import create from "zustand";
import { persist } from "zustand/middleware"; // ermöglicht den Zustand im lokalen Speicher (localStorage) zu speichern.

// Definition des Zustands
// - appStore ist eine Funktion, die ein Objekt zurückgibt. Dieses Objekt enthält den initialen Zustand (dopen: true)
//      und eine Methode (updateOpen), um den Zustand zu aktualisieren.
// - set ist eine Funktion, die von Zustand bereitgestellt wird und verwendet wird, um den Zustand zu ändern.
const appStore = (set:any) => ({
    dopen: true,
    updateOpen: (dopen:boolean) => set({ dopen }) // Update-Funktion
});

// Persistieren des Zustands mit lokalem Speicher
// - useAppStore ist der erstellte Zustand-Store, der Zustand mit Persistenzfunktionalität verbindet.
// - create erstellt den Zustand-Store basierend auf der appStore-Funktion.
// - persist wird verwendet, um den Zustand im lokalen Speicher (localStorage) zu speichern.
//     name: "my_app_store" gibt den Schlüssel an, unter dem der Zustand im lokalen Speicher gespeichert wird.
//     getStorage: () => localStorage gibt explizit an, dass localStorage verwendet werden soll. Dies ist optional, da localStorage standardmäßig verwendet wird.
const useAppStore = create(
    persist(appStore, {
        name: "my_app_store", // Name des Schlüssels im lokalen Speicher
        getStorage: () => localStorage, // Optional: explizite Angabe von localStorage
    })
);

export { useAppStore };

// Zusammengefasst:
//     Du definierst einen Zustand mit einer initialen dopen-Eigenschaft und einer updateOpen-Funktion, um diese Eigenschaft zu aktualisieren.
//     Du verwendest persist, um diesen Zustand im localStorage zu speichern.
//     Du erstellst den Zustand-Store mit create und persist.
//     Schließlich exportierst du den Zustand-Store zur Verwendung in anderen Teilen deiner Anwendung.
