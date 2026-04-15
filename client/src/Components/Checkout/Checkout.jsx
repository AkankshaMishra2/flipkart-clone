import { Box, Button, TextField, Typography, makeStyles, Grid, Paper, Snackbar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CART_RESET } from '../../redux/constants/cartConstants';
import TotalView from '../ShoppingBag/TotalView';

const useStyle = makeStyles(theme => ({
    component: {
        marginTop: 55,
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            padding: '15px 15px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        },
        background: '#f2f2f2',
        minHeight: '100vh',
    },
    container: {
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        padding: '30px 40px',
        animation: `$slideUp 0.6s ease-out`
    },
    "@keyframes slideUp": {
        "0%": {
            opacity: 0,
            transform: "translateY(20px)"
        },
        "100%": {
            opacity: 1,
            transform: "translateY(0)"
        }
    },
    header: {
        fontWeight: 600,
        fontSize: 24,
        marginBottom: 20,
        color: '#2874f0',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: 15
    },
    textField: {
        marginBottom: 20,
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#2874f0',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2874f0',
            },
        },
    },
    placeOrderBtn: {
        background: 'linear-gradient(90deg, #fb641b 0%, #ff9f00 100%)',
        color: '#fff',
        height: 52,
        borderRadius: 4,
        fontSize: 16,
        fontWeight: 600,
        marginTop: 20,
        boxShadow: '0 4px 14px rgba(251, 100, 27, 0.4)',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'linear-gradient(90deg, #e85d19 0%, #db8700 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(251, 100, 27, 0.6)',
        }
    },
    summaryWrapper: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: 20
        }
    }
}));

const Checkout = () => {
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            history.push('/');
        }
    }, [cartItems, history]);

    const [shippingData, setShippingData] = useState({
        name: '',
        phone: '',
        pincode: '',
        address: '',
        city: '',
        state: ''
    });

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const confirmOrder = () => {
        // Validation
        if (!shippingData.name || !shippingData.phone || !shippingData.address || !shippingData.pincode) {
            setErrorMsg('Please fill out all required fields.');
            return;
        }

        // Simulate order placement
        const orderId = 'OD' + Math.floor(Math.random() * 9000000000) + 1000000000;
        
        // Reset Cart
        dispatch({ type: CART_RESET });
        localStorage.setItem('cart', JSON.stringify([]));

        // Redirect
        history.push(`/order-confirmation/${orderId}`);
    };

    if (!cartItems.length) return null;

    return (
        <Box className={classes.component}>
            <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <Paper className={classes.container}>
                        <Typography className={classes.header}>Delivery Address</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Full Name" 
                                    name="name" 
                                    variant="outlined" 
                                    fullWidth 
                                    className={classes.textField} 
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Phone Number" 
                                    name="phone" 
                                    variant="outlined" 
                                    fullWidth 
                                    className={classes.textField} 
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Pincode" 
                                    name="pincode" 
                                    variant="outlined" 
                                    fullWidth 
                                    className={classes.textField} 
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="City/District/Town" 
                                    name="city" 
                                    variant="outlined" 
                                    fullWidth 
                                    className={classes.textField} 
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Address (Area and Street)" 
                                    name="address" 
                                    variant="outlined" 
                                    fullWidth 
                                    multiline 
                                    rows={3} 
                                    className={classes.textField} 
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="State" 
                                    name="state" 
                                    variant="outlined" 
                                    fullWidth 
                                    className={classes.textField} 
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        
                        <Button 
                            variant="contained" 
                            fullWidth 
                            className={classes.placeOrderBtn} 
                            onClick={confirmOrder}
                        >
                            Confirm Order
                        </Button>
                    </Paper>
                </Grid>
                
                <Grid item lg={4} md={4} sm={12} xs={12} className={classes.summaryWrapper}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Grid>

            <Snackbar
                open={!!errorMsg}
                autoHideDuration={3000}
                onClose={() => setErrorMsg('')}
                message={errorMsg}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default Checkout;
