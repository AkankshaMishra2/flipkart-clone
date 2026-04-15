import { useState, useEffect } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyle = makeStyles({
    component: {
        // width: '30%'
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    greyTextColor: {
        color: '#878787'
    },
    container: {
        '& > *': {
            marginBottom: 20,
            fontSize: 14
        }
    },
    price: {
        float: 'right'
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 600,
        borderTop: '1px dashed #e0e0e0',
        padding: '20px 0',
        borderBottom: '1px dashed #e0e0e0'
    }
})


const TotalView = ({ cartItems }) => {
    const classes = useStyle();
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        let totalPrice = 0, totalDiscount = 0;
        cartItems.forEach(item => {
            const qty = item.quantity || 1;
            totalPrice += item.price.mrp * qty;
            totalDiscount += (item.price.mrp - item.price.cost) * qty;
        });
        setPrice(totalPrice);
        setDiscount(totalDiscount);
    }, [cartItems]);
    
    const deliveryCharge = 40;
    
    return (
        <Box className={classes.component}>
            <Box className={classes.header} style={{borderBottom: '1px solid #f0f0f0'}}>
                <Typography className={classes.greyTextColor}>PRICE DETAILS</Typography>
            </Box>
            <Box className={clsx(classes.header, classes.container)}>
                <Typography>Price ({cartItems?.length} item{cartItems?.length !== 1 ? 's' : ''})<span className={classes.price}>₹{price}</span></Typography>
                <Typography>Discount<span className={classes.price} style={{ color: 'green' }}>-₹{discount}</span></Typography>
                <Typography>Delivery Charges<span className={classes.price}>₹{deliveryCharge}</span></Typography>
                <Typography className={classes.totalAmount}>Total Amount<span className={classes.price}>₹{price - discount + deliveryCharge}</span></Typography>
                <Typography style={{fontSize: 16, color: 'green'}}>You will save ₹{discount - deliveryCharge} on this order</Typography>
            </Box>
        </Box>
    )
}

export default TotalView;