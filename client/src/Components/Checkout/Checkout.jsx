import { useState, useContext } from 'react';
import { Box, Typography, makeStyles, TextField, Button, Grid, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { createOrder } from '../../service/api';
import * as actionTypes from '../../redux/constants/cartConstants';

const useStyle = makeStyles(theme => ({
    component: {
        padding: '30px 135px',
        [theme.breakpoints.down('md')]: {
            padding: '15px 15px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '15px 10px'
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0'
    },
    leftComponent: {
        paddingRight: 15,
        [theme.breakpoints.down('sm')]: {
            paddingRight: 0,
            marginBottom: 15
        }
    },
    formContainer: {
        background: '#fff',
        padding: '25px 30px',
        [theme.breakpoints.down('sm')]: {
            padding: '15px'
        }
    },
    textField: {
        marginBottom: 20,
    },
    summaryContainer: {
        background: '#fff',
        padding: '15px 24px'
    },
    cartItem: {
        display: 'flex',
        padding: '12px 0',
        alignItems: 'center'
    },
    itemImage: {
        width: 60,
        height: 60,
        marginRight: 15,
        [theme.breakpoints.down('sm')]: {
            width: 45,
            height: 45,
            marginRight: 10
        }
    },
    greyTextColor: {
        color: '#878787'
    },
    price: {
        float: 'right'
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 600,
        borderTop: '1px dashed #e0e0e0',
        padding: '15px 0',
        marginTop: 10
    },
    placeOrderBtn: {
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: '100%',
        height: 51,
        marginTop: 20,
        fontSize: 16,
        '&:hover': {
            background: '#e85d19'
        }
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#2874f0',
        marginBottom: 15,
        textTransform: 'uppercase'
    },
    userInfo: {
        background: '#f1f3f6',
        padding: '10px 15px',
        borderRadius: 4,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center'
    }
}));

const addressInitial = {
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
};

const Checkout = () => {
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    const { account } = useContext(LoginContext);
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const [shippingAddress, setShippingAddress] = useState(addressInitial);
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState('');

    // Redirect if not logged in or cart is empty
    if (!account) {
        history.push('/cart');
        return null;
    }

    if (!cartItems || cartItems.length === 0) {
        history.push('/cart');
        return null;
    }

    const totalMRP = cartItems.reduce((sum, item) => sum + (item.price.mrp * (item.quantity || 1)), 0);
    const totalCost = cartItems.reduce((sum, item) => sum + (item.price.cost * (item.quantity || 1)), 0);
    const discount = totalMRP - totalCost;
    const deliveryCharge = 40;
    const totalAmount = totalCost + deliveryCharge;

    const onChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const placeOrder = async () => {
        if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address || 
            !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
            setError('Please fill in all address fields');
            return;
        }
        if (!shippingAddress.email || !shippingAddress.email.includes('@')) {
            setError('Please enter a valid email address for order confirmation');
            return;
        }
        setError('');
        setPlacing(true);
        try {
            const orderData = {
                username: account,
                email: shippingAddress.email,
                items: cartItems.map(item => ({
                    id: item.id,
                    title: item.title.longTitle,
                    image: item.url,
                    price: item.price.cost,
                    quantity: item.quantity || 1
                })),
                shippingAddress,
                totalAmount,
                paymentMethod: 'cod'
            };
            const response = await createOrder(orderData);
            if (response && response.data) {
                // Clear cart
                dispatch({ type: actionTypes.CART_RESET });
                localStorage.removeItem('cart');
                history.push(`/order-confirmation/${response.data.orderId}`);
            }
        } catch (err) {
            setError('Failed to place order. Please try again.');
        }
        setPlacing(false);
    };

    return (
        <Box className={classes.component}>
            <Grid container>
                <Grid item lg={8} md={8} sm={12} xs={12} className={classes.leftComponent}>
                    <Box className={classes.header}>
                        <Typography style={{ fontWeight: 600, fontSize: 18 }}>Checkout</Typography>
                    </Box>

                    <Box className={classes.formContainer}>
                        {/* Logged in user info */}
                        <Box className={classes.userInfo}>
                            <Typography style={{ fontSize: 14 }}>
                                Logged in as: <strong>{account}</strong>
                            </Typography>
                        </Box>

                        <Typography className={classes.stepTitle}>Delivery Address</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    label="Full Name *"
                                    variant="outlined"
                                    fullWidth
                                    value={shippingAddress.name}
                                    onChange={onChange}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="phone"
                                    label="Phone Number *"
                                    variant="outlined"
                                    fullWidth
                                    value={shippingAddress.phone}
                                    onChange={onChange}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="Email Address * (for order confirmation)"
                                    variant="outlined"
                                    fullWidth
                                    value={shippingAddress.email}
                                    onChange={onChange}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="address"
                                    label="Address (House No, Street, Area) *"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={shippingAddress.address}
                                    onChange={onChange}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="city"
                                    label="City *"
                                    variant="outlined"
                                    fullWidth
                                    value={shippingAddress.city}
                                    onChange={onChange}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="state"
                                    label="State *"
                                    variant="outlined"
                                    fullWidth
                                    value={shippingAddress.state}
                                    onChange={onChange}
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="pincode"
                                    label="Pincode *"
                                    variant="outlined"
                                    fullWidth
                                    value={shippingAddress.pincode}
                                    onChange={onChange}
                                    className={classes.textField}
                                />
                            </Grid>
                        </Grid>
                        {error && <Typography style={{ color: '#ff6161', fontSize: 14, marginTop: 5 }}>{error}</Typography>}
                    </Box>
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Box className={classes.header} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <Typography className={classes.greyTextColor}>ORDER SUMMARY</Typography>
                    </Box>
                    <Box className={classes.summaryContainer}>
                        {cartItems.map(item => (
                            <Box key={item.id} className={classes.cartItem}>
                                <img src={item.url} className={classes.itemImage} alt="" />
                                <Box style={{ flex: 1 }}>
                                    <Typography style={{ fontSize: 14 }}>{item.title.longTitle}</Typography>
                                    <Typography style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>
                                        ₹{item.price.cost} × {item.quantity || 1}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        <Divider style={{ margin: '10px 0' }} />
                        <Typography style={{ fontSize: 14 }}>
                            Price ({cartItems.length} items)
                            <span className={classes.price}>₹{totalMRP}</span>
                        </Typography>
                        <Typography style={{ fontSize: 14, marginTop: 8 }}>
                            Discount
                            <span className={classes.price} style={{ color: 'green' }}>-₹{discount}</span>
                        </Typography>
                        <Typography style={{ fontSize: 14, marginTop: 8 }}>
                            Delivery Charges
                            <span className={classes.price}>₹{deliveryCharge}</span>
                        </Typography>
                        <Typography className={classes.totalAmount}>
                            Total Amount
                            <span className={classes.price}>₹{totalAmount}</span>
                        </Typography>
                        <Button 
                            variant="contained" 
                            className={classes.placeOrderBtn} 
                            onClick={placeOrder}
                            disabled={placing}
                        >
                            {placing ? 'Placing Order...' : 'PLACE ORDER'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;
