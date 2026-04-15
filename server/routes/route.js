import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { addItemInCart } from '../controller/cart-controller.js';
import { createOrder } from '../controller/payment-controller.js';
import { payOrder } from '../controller/payment-controller.js';
import { paymentResponse } from '../controller/payment-controller.js';
import { createNewOrder, getOrdersByUser, getOrderById } from '../controller/order-controller.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controller/wishlist-controller.js';


const router = express.Router();

// auth
router.post('/api/auth/register', userSignUp);
router.post('/api/auth/login', userLogIn);

// catalog
router.get('/api/catalog', getProducts);
router.get('/api/catalog/:id', getProductById);

// cart
router.post('/api/cart/add', addItemInCart);

// payment
router.get('/api/payment/key', (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
});
router.post('/api/payment/create', createOrder);
router.post('/api/payment/verify', payOrder);
router.get('/api/payment/response', paymentResponse);

// orders
router.post('/api/orders', createNewOrder);
router.get('/api/orders/:username', getOrdersByUser);
router.get('/api/orders/detail/:id', getOrderById);

// wishlist
router.post('/api/wishlist/add', addToWishlist);
router.get('/api/wishlist/:username', getWishlist);
router.post('/api/wishlist/remove', removeFromWishlist);

export default router;