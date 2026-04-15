import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const Wishlist = sequelize.define('wishlist', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Wishlist;
