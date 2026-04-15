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

export const getProducts = async (request, response) => {
    try {
        const products = await Product.findAll();
        const mapped = products.map(mapProductToClient);
        response.json(mapped);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const getProductById = async (request, response) => {
    try {
        const product = await Product.findOne({ where: { id: request.params.id } });
        if (product) {
            response.json(mapProductToClient(product));
        } else {
            response.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}