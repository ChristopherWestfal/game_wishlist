import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAppStore } from "../AppStore.tsx";
import { useNavigate } from "react-router-dom";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

type NavbarProps = {
    pageName: string,
}

export default function Navbar(props: Readonly<NavbarProps>) {
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMobileMenuOpenMobile = Boolean(mobileMenuAnchorEl);

    const dopen = useAppStore((state) => state.dopen);
    const updateOpen = useAppStore((state) => state.updateOpen);
    const mobileOpen = useAppStore((state) => state.mobileOpen);
    const setMobileOpen = useAppStore((state) => state.setMobileOpen);

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = React.useState<string>(''); // Local state for search input
    const globalSetSearchQuery = useAppStore((state) => state.setSearchQuery);
    const globalSetPageNumber = useAppStore((state) => state.setPageNumber);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery);
        globalSetSearchQuery(newQuery);
        globalSetPageNumber(1);
    };

    const handleProfileMenuOpen = () => {
        navigate('/login');
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null);
    };


    const handleMobileMenuOpenMobile = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMenuAnchorEl(event.currentTarget);
    };

    const handleDrawerToggle = () => {
        if (window.innerWidth < 600) {
            // Toggle mobile menu
            setMobileOpen(!mobileOpen);
        } else {
            // Toggle sidebar for desktop
            updateOpen(!dopen);
        }
    };

    const handleMobileMenuItemClick = (path: string) => {
        navigate(path);
        handleMobileMenuClose();
        globalSetSearchQuery("");
    };

    const menuId = 'primary-search-account-menu';


    const mobileMenuIdMobile = 'mobile-menu-mobile';
    const renderMobileMenuMobile = (
        <Menu
            anchorEl={mobileMenuAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuIdMobile}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpenMobile}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => handleMobileMenuItemClick('/')}>
                <Typography variant="body1">Gamelist</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMobileMenuItemClick('/wishlist')}>
                <Typography variant="body1">Wishlist</Typography>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                        onClick={handleMobileMenuOpenMobile}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {props.pageName}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search by name…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* Profile Icon for desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    {/* Profile Icon for mobile */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, ml: 'auto' }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenuMobile}
        </Box>
    );
}
