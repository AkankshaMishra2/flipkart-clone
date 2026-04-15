import axios from 'axios';

const url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/api/auth/login`, user);
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/api/auth/register`, user);
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`${url}/api/catalog/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}

export const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${url}/api/payment/create`, data);
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

// Orders API
export const createOrder = async (orderData) => {
    try {
        return await axios.post(`${url}/api/orders`, orderData);
    } catch (error) {
        console.log('Error creating order:', error);
    }
}

export const getOrdersByUser = async (username) => {
    try {
        return await axios.get(`${url}/api/orders/${username || 'guest'}`);
    } catch (error) {
        console.log('Error fetching orders:', error);
    }
}

export const getOrderById = async (orderId) => {
    try {
        return await axios.get(`${url}/api/orders/detail/${orderId}`);
    } catch (error) {
        console.log('Error fetching order:', error);
    }
}

// Wishlist API
export const addToWishlistAPI = async (username, productId) => {
    try {
        return await axios.post(`${url}/api/wishlist/add`, { username: username || 'guest', productId });
    } catch (error) {
        console.log('Error adding to wishlist:', error);
    }
}

export const getWishlistAPI = async (username) => {
    try {
        return await axios.get(`${url}/api/wishlist/${username || 'guest'}`);
    } catch (error) {
        console.log('Error fetching wishlist:', error);
    }
}

export const removeFromWishlistAPI = async (username, productId) => {
    try {
        return await axios.post(`${url}/api/wishlist/remove`, { username: username || 'guest', productId });
    } catch (error) {
        console.log('Error removing from wishlist:', error);
    }
}
