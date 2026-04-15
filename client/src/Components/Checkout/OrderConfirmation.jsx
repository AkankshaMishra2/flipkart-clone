import { Box, Typography, Button, makeStyles, Paper } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    component: {
        marginTop: 55,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        background: '#f2f2f2',
    },
    container: {
        background: '#fff',
        borderRadius: 8,
        padding: '50px 60px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        animation: `$zoomIn 0.5s ease-out`,
        maxWidth: 500,
        width: '100%'
    },
    "@keyframes zoomIn": {
        "0%": {
            opacity: 0,
            transform: "scale(0.9)"
        },
        "100%": {
            opacity: 1,
            transform: "scale(1)"
        }
    },
    successIcon: {
        color: '#26a541',
        fontSize: 80,
        marginBottom: 20,
        animation: `$bounce 1s ease-in-out`
    },
    "@keyframes bounce": {
        "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
        "40%": { transform: "translateY(-20px)" },
        "60%": { transform: "translateY(-10px)" }
    },
    heading: {
        fontSize: 28,
        fontWeight: 600,
        color: '#212121',
        marginBottom: 15
    },
    subHeading: {
        fontSize: 16,
        color: '#878787',
        marginBottom: 25,
        lineHeight: 1.5
    },
    orderIdText: {
        fontWeight: 600,
        color: '#2874f0'
    },
    continueBtn: {
        background: '#2874f0',
        color: '#fff',
        padding: '12px 30px',
        fontWeight: 600,
        borderRadius: 4,
        marginTop: 10,
        transition: 'all 0.3s ease',
        '&:hover': {
            background: '#1a5cbf',
            boxShadow: '0 4px 10px rgba(40, 116, 240, 0.4)'
        }
    }
}));

const OrderConfirmation = () => {
    const classes = useStyle();
    const history = useHistory();
    const { id } = useParams();

    return (
        <Box className={classes.component}>
            <Paper className={classes.container}>
                <CheckCircleOutline className={classes.successIcon} />
                <Typography className={classes.heading}>Order Placed Successfully!</Typography>
                <Typography className={classes.subHeading}>
                    Thank you for shopping with us. Your order <span className={classes.orderIdText}>{id}</span> has been placed. We've sent a confirmation email with your order details.
                </Typography>
                <Button 
                    variant="contained" 
                    className={classes.continueBtn}
                    onClick={() => history.push('/')}
                >
                    Continue Shopping
                </Button>
            </Paper>
        </Box>
    );
};

export default OrderConfirmation;
