import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try { 
        const { data } = await axios.get(`http://localhost:8000/api/catalog/${id}`);

        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });

        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log('Error while calling cart API');
    }
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};

export const updateCartQty = (id, quantity) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.CART_UPDATE_QTY,
        payload: { id, quantity }
    });

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};