import { useState, useEffect, useContext } from 'react';
import { Box, Typography, makeStyles, Button, Grid, Card } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { getWishlistAPI, removeFromWishlistAPI } from '../../service/api';
import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { FavoriteBorder, Delete, ShoppingCart } from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
    component: {
        padding: '30px 135px',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 10px'
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: 2
    },
    productCard: {
        background: '#fff',
        marginBottom: 8,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start'
        }
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 20
    },
    productInfo: {
        flex: 1
    },
    price: {
        fontSize: 18,
        fontWeight: 600
    },
    greyTextColor: {
        color: '#878787',
        fontSize: 14
    },
    actions: {
        display: 'flex',
        gap: 10,
        [theme.breakpoints.down('sm')]: {
            marginTop: 10
        }
    },
    moveToCartBtn: {
        background: '#ff9f00',
        color: '#fff',
        borderRadius: 2,
        textTransform: 'none',
        '&:hover': {
            background: '#e8900e'
        }
    },
    removeBtn: {
        color: '#878787',
        borderRadius: 2,
        textTransform: 'none'
    },
    emptyContainer: {
        background: '#fff',
        padding: '60px 0',
        textAlign: 'center'
    },
    emptyIcon: {
        fontSize: 60,
        color: '#ff6161',
        marginBottom: 15
    },
    shopBtn: {
        marginTop: 20,
        background: '#2874f0',
        color: '#fff',
        borderRadius: 2,
        padding: '10px 40px',
        '&:hover': {
            background: '#2564d4'
        }
    }
}));

const Wishlist = () => {
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    const { account } = useContext(LoginContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const response = await getWishlistAPI(account || 'guest');
            if (response && response.data) {
                setWishlistItems(response.data);
            }
        } catch (error) {
            console.log('Error fetching wishlist:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWishlist();
    }, [account]);

    const handleRemove = async (productId) => {
        await removeFromWishlistAPI(account || 'guest', productId);
        fetchWishlist();
    };

    const handleMoveToCart = async (item) => {
        dispatch(addToCart(item.id, 1));
        await removeFromWishlistAPI(account || 'guest', item.id);
        fetchWishlist();
        history.push('/cart');
    };

    if (loading) {
        return (
            <Box className={classes.component}>
                <Box className={classes.header}>
                    <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Wishlist</Typography>
                </Box>
                <Box className={classes.emptyContainer}>
                    <Typography>Loading wishlist...</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box className={classes.component}>
            <Box className={classes.header}>
                <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Wishlist ({wishlistItems.length})</Typography>
            </Box>
            {wishlistItems.length === 0 ? (
                <Box className={classes.emptyContainer}>
                    <FavoriteBorder className={classes.emptyIcon} />
                    <Typography variant="h6">Your wishlist is empty</Typography>
                    <Typography className={classes.greyTextColor}>Add items you like to your wishlist.</Typography>
                    <Button 
                        variant="contained" 
                        className={classes.shopBtn}
                        onClick={() => history.push('/')}
                    >
                        Start Shopping
                    </Button>
                </Box>
            ) : (
                wishlistItems.map(item => (
                    <Card key={item.id} className={classes.productCard} elevation={0}>
                        <Link to={`/product/${item.id}`}>
                            <img src={item.url} className={classes.image} alt="" />
                        </Link>
                        <Box className={classes.productInfo}>
                            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography>{item.title.longTitle}</Typography>
                            </Link>
                            <Typography style={{ marginTop: 5 }}>
                                <span className={classes.price}>₹{item.price.cost}</span>&nbsp;&nbsp;
                                <span className={classes.greyTextColor}><strike>₹{item.price.mrp}</strike></span>&nbsp;&nbsp;
                                <span style={{ color: '#388E3C', fontSize: 14 }}>{item.price.discount} off</span>
                            </Typography>
                        </Box>
                        <Box className={classes.actions}>
                            <Button 
                                variant="contained" 
                                className={classes.moveToCartBtn}
                                startIcon={<ShoppingCart />}
                                onClick={() => handleMoveToCart(item)}
                            >
                                Move to Cart
                            </Button>
                            <Button 
                                variant="outlined" 
                                className={classes.removeBtn}
                                startIcon={<Delete />}
                                onClick={() => handleRemove(item.id)}
                            >
                                Remove
                            </Button>
                        </Box>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default Wishlist;
