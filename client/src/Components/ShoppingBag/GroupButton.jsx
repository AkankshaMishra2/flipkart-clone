import React from "react";
import { ButtonGroup, Button, makeStyles } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { updateCartQty, removeFromCart } from '../../redux/actions/cartActions';

const useStyle = makeStyles({
    component: {
        marginTop: 30
    },
    button :{
        borderRadius: '50%'
    }
})

const GroupedButton = ({ item }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const quantity = item.quantity || 1;

    const handleIncrement = () => {
        dispatch(updateCartQty(item.id, quantity + 1));
    };

    const handleDecrement = () => {
        if (quantity <= 1) {
            dispatch(removeFromCart(item.id));
        } else {
            dispatch(updateCartQty(item.id, quantity - 1));
        }
    };

    return (
        <ButtonGroup className={classes.component} >
            <Button className={classes.button} onClick={handleDecrement}>-</Button>
            <Button disabled>{quantity}</Button>
            <Button className={classes.button} onClick={handleIncrement}>+</Button>
        </ButtonGroup>
    );
}

export default GroupedButton;