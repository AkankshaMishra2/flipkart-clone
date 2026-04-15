import { useState, useContext } from 'react';
import { Button, Box, makeStyles, Snackbar } from '@material-ui/core';
import { ShoppingCart as Cart, FlashOn as Flash, FavoriteBorder } from '@material-ui/icons';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { addToWishlistAPI } from '../../service/api';
import LoginDialog from '../Login/LoginDialog';


const useStyle = makeStyles(theme => ({
    leftContainer: {
        minWidth: '40%',
        padding: '40px 0 0 80px',
        [theme.breakpoints.down('md')]: {
            padding: '20px 40px'
        }
    },
    productImage: {
        padding: '15px 20px',
        border: '1px solid #f0f0f0',
        width: '95%'
    },
    button: {
        width: '46%',
        borderRadius: 2,
        height: 50,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: 10
        }
    },
    addToCart: {
        background: '#ff9f00',
        color: '#FFF',
        '&:hover': {
            background: '#e8900e'
        }
    },
    buyNow:{
        background: '#fb641b',
        color: '#FFF',
        '&:hover': {
            background: '#e85d19'
        }
    },
    wishlistBtn: {
        position: 'absolute',
        right: 10,
        top: 10,
        minWidth: 'unset',
        padding: 8,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        '&:hover': {
            background: '#f5f5f5'
        }
    },
    imageContainer: {
        position: 'relative'
    }
}));

const ActionItem = ({ product }) => {
    const classes = useStyle();
    const history = useHistory();
    const { account, setAccount } = useContext(LoginContext);
    const { id } = product;
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [loginOpen, setLoginOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
        
    const [quantity] = useState(1);
    const dispatch = useDispatch();

    const requireLogin = (action) => {
        if (!account) {
            setPendingAction(action);
            setLoginOpen(true);
            return false;
        }
        return true;
    };

    const handleLoginSuccess = (username) => {
        setAccount(username);
        setLoginOpen(false);
        // Execute the pending action after login
        if (pendingAction === 'buyNow') {
            dispatch(addToCart(id, quantity));
            history.push('/checkout');
        } else if (pendingAction === 'addToCart') {
            dispatch(addToCart(id, quantity));
            history.push('/cart');
        } else if (pendingAction === 'wishlist') {
            addToWishlistAction();
        }
        setPendingAction(null);
    };

    const buyNow = () => {
        if (!requireLogin('buyNow')) return;
        dispatch(addToCart(id, quantity));
        history.push('/checkout');
    };

    const addItemToCart = () => {
        if (!requireLogin('addToCart')) return;
        dispatch(addToCart(id, quantity));
        history.push('/cart');
    };

    const addToWishlistAction = async () => {
        try {
            const response = await addToWishlistAPI(account || 'guest', id);
            if (response) {
                setSnackMsg('Added to Wishlist!');
            }
        } catch (err) {
            setSnackMsg('Already in Wishlist');
        }
        setSnackOpen(true);
    };

    const addToWishlist = () => {
        if (!requireLogin('wishlist')) return;
        addToWishlistAction();
    };

    return (
        <Box className={classes.leftContainer}>
            <Box className={classes.imageContainer}>
                <img src={product.detailUrl} className={classes.productImage} alt="" />
                <Button className={classes.wishlistBtn} onClick={addToWishlist}>
                    <FavoriteBorder style={{ color: '#ff6161' }} />
                </Button>
            </Box>
            <br />
            <Button onClick={addItemToCart} className={clsx(classes.button, classes.addToCart)} style={{marginRight: 10}} variant="contained"><Cart />Add to Cart</Button>
            <Button onClick={buyNow} className={clsx(classes.button, classes.buyNow)} variant="contained"><Flash /> Buy Now</Button>
            <Snackbar
                open={snackOpen}
                autoHideDuration={2000}
                onClose={() => setSnackOpen(false)}
                message={snackMsg}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
            <LoginDialog 
                open={loginOpen} 
                setOpen={setLoginOpen} 
                setAccount={(username) => handleLoginSuccess(username)} 
            />
        </Box>
    )
}

export default ActionItem;