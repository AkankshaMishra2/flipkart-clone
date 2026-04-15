import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';

const Order = sequelize.define('order', {
    orderId: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => 'ORD-' + uuidv4().slice(0, 8).toUpperCase()
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'guest'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    items: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('items');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('items', JSON.stringify(value));
        }
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('shippingAddress');
            return rawValue ? JSON.parse(rawValue) : {};
        },
        set(value) {
            this.setDataValue('shippingAddress', JSON.stringify(value));
        }
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'confirmed'
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        defaultValue: 'cod'
    },
    razorpay_order_id: DataTypes.STRING,
    razorpay_payment_id: DataTypes.STRING,
    razorpay_signature: DataTypes.STRING
}, {
    timestamps: true
});

export default Order;
