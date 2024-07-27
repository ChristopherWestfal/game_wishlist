import create from "zustand";
import { persist } from "zustand/middleware";

// Definition des Zustands
const appStore = (set:any) => ({
    dopen: true,
    updateOpen: (dopen:boolean) => set({ dopen }) // Update-Funktion
});

// Persistieren des Zustands mit lokalem Speicher
const useAppStore = create(
    persist(appStore, {
        name: "my_app_store", // Name des Schlüssels im lokalen Speicher
        getStorage: () => localStorage, // Optional: explizite Angabe von localStorage
    })
);

export { useAppStore };
