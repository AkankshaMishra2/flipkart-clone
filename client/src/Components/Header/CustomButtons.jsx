import React, { useState, useContext } from 'react';
import { makeStyles, Box, Typography, Badge, Button, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ShoppingCart, FavoriteBorder, ExpandMore } from '@material-ui/icons';
import LoginDialog from '../Login/LoginDialog';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';
import Profile from './Profile';

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    wrapper: {
        margin: '0 5% 0 auto', 
        display: 'flex',    
        '& > *': {
            marginRight: 50,
            textDecoration: 'none',
            color: '#FFFFFF',
            fontSize: 12,
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                color: '#2874f0',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 10
            }      
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }   
    },
    login: {
        color: '#2874f0',
        background: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 40px',
        height: 32,
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            background: '#2874f0',
            color: '#FFFFFF'
        }   
    },
    moreMenu: {
        marginTop: 40
    }
}));


const CustomButtons = () => {
    const classes = useStyle();
    const [ open, setOpen ] = useState(false);
    const [ moreAnchor, setMoreAnchor ] = useState(null);
    const { account, setAccount } = useContext(LoginContext);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const openDialog = () => {
        setOpen(true);
    }

    const handleMoreClick = (event) => {
        setMoreAnchor(event.currentTarget);
    };

    const handleMoreClose = () => {
        setMoreAnchor(null);
    };

    return (
        <Box className={classes.wrapper}>
            {
                account ? <Profile account={account} setAccount={setAccount} /> : 
                <Link>
                    <Button className={classes.login} variant="contained" onClick={() => openDialog() }>Login</Button>
                </Link>
            }
            <Link to='/wishlist' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <FavoriteBorder style={{ fontSize: 20, marginRight: 5 }} />
                <Typography style={{ marginTop: 2 }}>Wishlist</Typography>
            </Link>
            <Box onClick={handleMoreClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Typography style={{ marginTop: 2 }}>More</Typography>
                <ExpandMore style={{ fontSize: 16 }} />
            </Box>
            <Menu
                anchorEl={moreAnchor}
                open={Boolean(moreAnchor)}
                onClose={handleMoreClose}
                className={classes.moreMenu}
            >
                <MenuItem component={Link} to="/orders" onClick={handleMoreClose}>
                    My Orders
                </MenuItem>
                <MenuItem component={Link} to="/wishlist" onClick={handleMoreClose}>
                    My Wishlist
                </MenuItem>
            </Menu>
            <Link to='/cart' className={classes.container}>
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Link>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Box>
    )
}

export default CustomButtons;