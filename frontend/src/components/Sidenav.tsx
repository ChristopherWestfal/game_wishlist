import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useAppStore } from "../AppStore.tsx";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CssBaseline, ListItemButton, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            height: '100vh',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            backgroundColor: '#101f33',
            color: 'rgba(255, 255, 255, 0.7)',
            ...(open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: drawerWidth,
                [theme.breakpoints.up('sm')]: {
                    width: drawerWidth,
                },
            }),
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function Sidenav() {
    const navigate = useNavigate();
    const dopen = useAppStore((state) => state.dopen);
    const mobileOpen = useAppStore((state) => state.mobileOpen);
    const globalSetSearchQuery = useAppStore((state) => state.setSearchQuery);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const setMobileOpen = useAppStore((state) => state.setMobileOpen);

    // Handle drawer toggle
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? mobileOpen : dopen}
                onClose={isMobile ? handleDrawerToggle : undefined} // Ensure onClose is used only for mobile view
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {
                        navigate("/");
                        globalSetSearchQuery("");
                        if (isMobile) handleDrawerToggle(); // Close drawer on item click in mobile view
                    }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: dopen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: dopen ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                <VideogameAssetIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gamelist" sx={{
                                opacity: dopen ? 1 : 0,
                                '& span': {
                                    fontWeight: '600',
                                    fontSize: '16px'
                                }
                            }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {
                        navigate("/wishlist");
                        globalSetSearchQuery("");
                        if (isMobile) handleDrawerToggle(); // Close drawer on item click in mobile view
                    }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: dopen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: dopen ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                <FactCheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Wishlist" sx={{
                                opacity: dopen ? 1 : 0,
                                '& span': {
                                    fontWeight: '600',
                                    fontSize: '16px'
                                }
                            }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}
