import { useState, useEffect, useContext } from 'react';
import { Box, Typography, makeStyles, Button, Divider, Card } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { getOrdersByUser } from '../../service/api';
import { ShoppingCart } from '@material-ui/icons';

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
    orderCard: {
        background: '#fff',
        marginBottom: 8,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.1)'
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start'
        }
    },
    orderImages: {
        display: 'flex',
        marginRight: 20,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 10
        }
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 8,
        border: '1px solid #f0f0f0',
        borderRadius: 4
    },
    orderInfo: {
        flex: 1
    },
    orderId: {
        fontSize: 14,
        fontWeight: 600,
        color: '#2874f0'
    },
    status: {
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 2,
        fontSize: 12,
        fontWeight: 600,
        marginLeft: 10,
        textTransform: 'uppercase'
    },
    statusConfirmed: {
        background: '#e8f5e9',
        color: '#2e7d32'
    },
    statusDelivered: {
        background: '#e3f2fd',
        color: '#1565c0'
    },
    totalAmount: {
        fontWeight: 600,
        fontSize: 16,
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
            marginTop: 10
        }
    },
    greyText: {
        color: '#878787',
        fontSize: 13,
        marginTop: 3
    },
    emptyContainer: {
        background: '#fff',
        padding: '60px 0',
        textAlign: 'center'
    },
    emptyIcon: {
        fontSize: 60,
        color: '#2874f0',
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

const OrderHistory = () => {
    const classes = useStyle();
    const history = useHistory();
    const { account } = useContext(LoginContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [loginOpen, setLoginOpen] = useState(false);

    useEffect(() => {
        if (!account) {
            setLoading(false);
            return;
        }
        const fetchOrders = async () => {
            try {
                const response = await getOrdersByUser(account);
                if (response && response.data) {
                    setOrders(response.data);
                }
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
            setLoading(false);
        };
        fetchOrders();
    }, [account]);

    if (!account) {
        return (
            <Box className={classes.component}>
                <Box className={classes.header}>
                    <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Orders</Typography>
                </Box>
                <Box className={classes.emptyContainer}>
                    <Typography variant="h6">Missing Orders?</Typography>
                    <Typography className={classes.greyText} style={{ marginBottom: 20 }}>Login to view your previously placed orders.</Typography>
                    <Button 
                        variant="contained" 
                        className={classes.shopBtn}
                        onClick={() => history.push('/')}
                    >
                        Return Home
                    </Button>
                </Box>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box className={classes.component}>
                <Box className={classes.header}>
                    <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Orders</Typography>
                </Box>
                <Box className={classes.emptyContainer}>
                    <Typography>Loading orders...</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box className={classes.component}>
            <Box className={classes.header}>
                <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Orders ({orders.length})</Typography>
            </Box>
            {orders.length === 0 ? (
                <Box className={classes.emptyContainer}>
                    <ShoppingCart className={classes.emptyIcon} />
                    <Typography variant="h6">No orders yet</Typography>
                    <Typography className={classes.greyText}>Looks like you haven't placed any orders.</Typography>
                    <Button 
                        variant="contained" 
                        className={classes.shopBtn}
                        onClick={() => history.push('/')}
                    >
                        Start Shopping
                    </Button>
                </Box>
            ) : (
                orders.map(order => {
                    const items = order.items || [];
                    const date = new Date(order.createdAt);
                    return (
                        <Card 
                            key={order.orderId} 
                            className={classes.orderCard}
                            onClick={() => history.push(`/order-confirmation/${order.orderId}`)}
                            elevation={0}
                        >
                            <Box className={classes.orderImages}>
                                {items.slice(0, 3).map((item, i) => (
                                    <img key={i} src={item.image} className={classes.itemImage} alt="" />
                                ))}
                                {items.length > 3 && (
                                    <Box className={classes.itemImage} style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        background: '#f1f3f6',
                                        fontSize: 13,
                                        fontWeight: 600
                                    }}>
                                        +{items.length - 3}
                                    </Box>
                                )}
                            </Box>
                            <Box className={classes.orderInfo}>
                                <Typography className={classes.orderId}>
                                    {order.orderId}
                                    <span className={`${classes.status} ${
                                        order.status === 'delivered' ? classes.statusDelivered : classes.statusConfirmed
                                    }`}>
                                        {order.status}
                                    </span>
                                </Typography>
                                <Typography className={classes.greyText}>
                                    Ordered on {date.toLocaleDateString('en-IN', { 
                                        year: 'numeric', month: 'long', day: 'numeric' 
                                    })}
                                </Typography>
                                <Typography className={classes.greyText}>
                                    {items.length} item{items.length !== 1 ? 's' : ''}
                                </Typography>
                            </Box>
                            <Typography className={classes.totalAmount}>₹{order.totalAmount}</Typography>
                        </Card>
                    );
                })
            )}
        </Box>
    );
};

export default OrderHistory;
