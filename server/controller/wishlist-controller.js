import Wishlist from '../model/Wishlist.js';
import Product from '../model/Product.js';

const mapProductToClient = (product) => {
    return {
        id: product.id,
        url: product.url,
        detailUrl: product.detailUrl,
        description: product.description,
        discount: product.discount,
        tagline: product.tagline,
        quantity: product.quantity,
        title: {
            shortTitle: product.title_short,
            longTitle: product.title_long
        },
        price: {
            mrp: product.price_mrp,
            cost: product.price_cost,
            discount: product.price_discount
        }
    };
};

export const addToWishlist = async (request, response) => {
    try {
        const { username, productId } = request.body;
        
        const existing = await Wishlist.findOne({ 
            where: { username: username || 'guest', productId } 
        });
        if (existing) {
            return response.status(400).json({ message: 'Already in wishlist' });
        }

        const item = await Wishlist.create({ 
            username: username || 'guest', 
            productId 
        });
        return response.status(201).json(item);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getWishlist = async (request, response) => {
    try {
        const { username } = request.params;
        const wishlistItems = await Wishlist.findAll({ 
            where: { username: username || 'guest' } 
        });
        
        // Get full product details for each wishlist item
        const productIds = wishlistItems.map(item => item.productId);
        const products = await Product.findAll({ where: { id: productIds } });
        const mappedProducts = products.map(mapProductToClient);
        
        return response.json(mappedProducts);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const removeFromWishlist = async (request, response) => {
    try {
        const { username, productId } = request.body;
        await Wishlist.destroy({ 
            where: { username: username || 'guest', productId } 
        });
        return response.json({ message: 'Removed from wishlist' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
