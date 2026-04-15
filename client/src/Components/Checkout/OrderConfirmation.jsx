import { useState, useEffect } from 'react';
import { Box, Typography, makeStyles, Button, Divider } from '@material-ui/core';
import { useParams, useHistory, Link } from 'react-router-dom';
import { CheckCircle } from '@material-ui/icons';
import { getOrderById } from '../../service/api';

const useStyle = makeStyles(theme => ({
    component: {
        padding: '30px 135px',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 10px'
        }
    },
    container: {
        background: '#fff',
        padding: '40px 50px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 15px'
        }
    },
    icon: {
        fontSize: 80,
        color: '#2874f0',
        marginBottom: 20
    },
    orderId: {
        fontSize: 18,
        fontWeight: 600,
        color: '#2874f0',
        marginTop: 10,
        padding: '8px 20px',
        background: '#f1f3f6',
        borderRadius: 4,
        display: 'inline-block'
    },
    detailsContainer: {
        background: '#fff',
        padding: '25px 50px',
        textAlign: 'left',
        marginTop: 15,
        [theme.breakpoints.down('sm')]: {
            padding: '15px'
        }
    },
    sectionTitle: {
        fontWeight: 600,
        fontSize: 16,
        color: '#212121',
        marginBottom: 10
    },
    itemRow: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0'
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    btn: {
        marginTop: 25,
        borderRadius: 2,
        height: 48,
        padding: '0 40px',
        '&:hover': {
            background: '#2564d4'
        }
    },
    greyText: {
        color: '#878787',
        fontSize: 14
    }
}));

const OrderConfirmation = () => {
    const classes = useStyle();
    const { id } = useParams();
    const history = useHistory();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getOrderById(id);
                if (response && response.data) {
                    setOrder(response.data);
                }
            } catch (error) {
                console.log('Error fetching order:', error);
            }
            setLoading(false);
        };
        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <Box className={classes.component}>
                <Box className={classes.container}>
                    <Typography>Loading order details...</Typography>
                </Box>
            </Box>
        );
    }

    if (!order) {
        return (
            <Box className={classes.component}>
                <Box className={classes.container}>
                    <Typography variant="h6">Order not found</Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.btn}
                        onClick={() => history.push('/')}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Box>
        );
    }

    const items = order.items || [];
    const address = order.shippingAddress || {};

    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <CheckCircle className={classes.icon} />
                <Typography variant="h5" style={{ fontWeight: 600 }}>
                    Order Placed Successfully!
                </Typography>
                <Typography style={{ marginTop: 10, color: '#878787' }}>
                    Thank you for your order. Your order has been confirmed.
                </Typography>
                <Typography className={classes.orderId}>
                    Order ID: {order.orderId}
                </Typography>
            </Box>

            <Box className={classes.detailsContainer}>
                <Typography className={classes.sectionTitle}>Order Items</Typography>
                <Divider />
                {items.map((item, index) => (
                    <Box key={index} className={classes.itemRow}>
                        <img src={item.image} className={classes.itemImage} alt="" />
                        <Box style={{ flex: 1 }}>
                            <Typography style={{ fontSize: 14 }}>{item.title}</Typography>
                            <Typography style={{ fontSize: 14, color: '#878787', marginTop: 2 }}>
                                Qty: {item.quantity}
                            </Typography>
                        </Box>
                        <Typography style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</Typography>
                    </Box>
                ))}
                <Divider style={{ margin: '10px 0' }} />
                <Typography style={{ fontWeight: 600, fontSize: 16, textAlign: 'right' }}>
                    Total: ₹{order.totalAmount}
                </Typography>
            </Box>

            <Box className={classes.detailsContainer}>
                <Typography className={classes.sectionTitle}>Delivery Address</Typography>
                <Divider style={{ marginBottom: 10 }} />
                <Typography style={{ fontWeight: 600 }}>{address.name}</Typography>
                <Typography className={classes.greyText}>{address.address}</Typography>
                <Typography className={classes.greyText}>
                    {address.city}, {address.state} - {address.pincode}
                </Typography>
                <Typography className={classes.greyText}>Phone: {address.phone}</Typography>
            </Box>

            <Box className={classes.detailsContainer} style={{ textAlign: 'center' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.btn}
                    onClick={() => history.push('/')}
                    style={{ marginRight: 15 }}
                >
                    Continue Shopping
                </Button>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    className={classes.btn}
                    component={Link}
                    to="/orders"
                >
                    View All Orders
                </Button>
            </Box>
        </Box>
    );
};

export default OrderConfirmation;
