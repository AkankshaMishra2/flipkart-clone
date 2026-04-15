import { products } from './constants/product.js';
import Product from './model/Product.js';

const DefaultData = async () => {
    try {
        const count = await Product.count();
        if (count === 0) {
            const mappedProducts = products.map(product => ({
                id: product.id,
                url: product.url,
                detailUrl: product.detailUrl,
                description: product.description,
                discount: product.discount,
                tagline: product.tagline,
                quantity: product.quantity,
                title_short: product.title.shortTitle,
                title_long: product.title.longTitle,
                price_mrp: product.price.mrp,
                price_cost: product.price.cost,
                price_discount: product.price.discount
            }));
            await Product.bulkCreate(mappedProducts);
            console.log('Data imported Successfully');
        }
    } catch (error) {
        console.log('Error while inserting default data ', error.message);
    }
}

export default DefaultData;
