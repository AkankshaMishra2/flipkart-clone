import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find(product => product.id === item.id);

            if(existItem){
                return {
                    ...state, cartItems: state.cartItems.map(x => x.id === existItem.id ? item : x)
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload)
            };
        case actionTypes.CART_UPDATE_QTY:
            return {
                ...state,
                cartItems: state.cartItems.map(product =>
                    product.id === action.payload.id
                        ? { ...product, quantity: action.payload.quantity }
                        : product
                )
            };
        case actionTypes.CART_RESET:
            return { cartItems: [] };
        default:
            return state;
    }
}