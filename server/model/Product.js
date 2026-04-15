import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    url: DataTypes.STRING,
    detailUrl: DataTypes.STRING,
    title_short: DataTypes.STRING,
    title_long: DataTypes.STRING,
    price_mrp: DataTypes.FLOAT,
    price_cost: DataTypes.FLOAT,
    price_discount: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    discount: DataTypes.STRING,
    tagline: DataTypes.STRING
}, {
    timestamps: false
});

export default Product;
