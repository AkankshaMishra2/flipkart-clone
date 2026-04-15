import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const Cart = sequelize.define('cart', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    price: {
        type: DataTypes.FLOAT
    }
}, {
    timestamps: true
});

export default Cart;
