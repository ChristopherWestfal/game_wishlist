import create from 'zustand';

// Define your store's state and actions
interface AppState {
    dopen: boolean; // State for the sidebar drawer
    updateOpen: (open: boolean) => void;
    mobileOpen: boolean; // State for mobile drawer
    setMobileOpen: (open: boolean) => void;
    burgerMenuOpen: boolean; // State for the burger menu
    setBurgerMenuOpen: (open: boolean) => void;
    searchQuery: string; // Global search query
    setSearchQuery: (query: string) => void;
    pageNumber: number; // Page number for pagination
    setPageNumber: (page: number) => void;
    moreMenuAnchorEl: null | HTMLElement; // State for the more menu anchor element
    setMoreMenuAnchorEl: (el: null | HTMLElement) => void;
}

// Create your store
export const useAppStore = create<AppState>((set) => ({
    dopen: false,
    updateOpen: (open) => set({ dopen: open }),
    mobileOpen: false,
    setMobileOpen: (open) => set({ mobileOpen: open }),
    burgerMenuOpen: false,
    setBurgerMenuOpen: (open) => set({ burgerMenuOpen: open }),
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    pageNumber: 1,
    setPageNumber: (page) => set({ pageNumber: page }),
    moreMenuAnchorEl: null,
    setMoreMenuAnchorEl: (el) => set({ moreMenuAnchorEl: el }),
}));
