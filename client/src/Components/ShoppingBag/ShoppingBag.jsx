import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem';
import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import LoginDialog from '../Login/LoginDialog';


const useStyle = makeStyles(theme => ({
    component: {
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            padding: '15px 15px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        }
    },
    leftComponent: {
        paddingRight: 15,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 15,
            paddingRight: 0
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    bottom: {
        padding: '16px 22px',
        background: '#fff',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
        borderTop: '1px solid #f0f0f0'
    },
    placeOrder: {
        display: 'flex',
        marginLeft: 'auto',
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: 250,
        height: 51,
        '&:hover': {
            background: '#e85d19'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    }
}));

const ShoppingBag = () => {
    const classes = useStyle();
    const history = useHistory();
    const { account, setAccount } = useContext(LoginContext);
    const [loginOpen, setLoginOpen] = useState(false);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const dispatch = useDispatch();

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const proceedToCheckout = () => {
        if (!account) {
            setLoginOpen(true);
            return;
        }
        history.push('/checkout');
    }

    const handleLoginSuccess = (username) => {
        setAccount(username);
        setLoginOpen(false);
        history.push('/checkout');
    };

    return (
        <>
        { cartItems.length ? 
            <Grid container className={classes.component}>
                <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                    <Box className={classes.header}>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Shopping Bag ({cartItems?.length})</Typography>
                    </Box>
                        {   cartItems.map(item => (
                                <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <Box className={classes.bottom}>
                        <Button onClick={proceedToCheckout} variant="contained" className={classes.placeOrder}>Place Order</Button>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Grid> : <EmptyCart />
        }
        <LoginDialog 
            open={loginOpen} 
            setOpen={setLoginOpen} 
            setAccount={(username) => handleLoginSuccess(username)} 
        />
        </>

    )
}

export default ShoppingBag;