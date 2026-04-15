import Cart from '../model/Cart.js';

export const addItemInCart = async (request, response) => {
    try {
        const cartItem = await Cart.create(request.body);
        return response.json(cartItem);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}