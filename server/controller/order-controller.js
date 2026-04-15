import Order from '../model/Order.js';
import nodemailer from 'nodemailer';

// Create nodemailer transporter. Defaults to ethereal test credentials if not present in .env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
        user: process.env.SMTP_USER || 'test@ethereal.email',
        pass: process.env.SMTP_PASS || 'test'
    }
});

export const createNewOrder = async (request, response) => {
    try {
        const { username, email, items, shippingAddress, totalAmount, paymentMethod } = request.body;
        
        if (!items || items.length === 0) {
            return response.status(400).json({ message: 'No items in order' });
        }
        if (!shippingAddress || !shippingAddress.name || !shippingAddress.address) {
            return response.status(400).json({ message: 'Shipping address is required' });
        }

        const order = await Order.create({
            username: username || 'guest',
            email: email,
            items,
            shippingAddress,
            totalAmount,
            paymentMethod: paymentMethod || 'cod',
            status: 'confirmed',
            isPaid: paymentMethod === 'cod' ? false : true
        });

        // Try to send email confirmation
        if (email) {
            try {
                const info = await transporter.sendMail({
                    from: '"Flipkart Clone" <noreply@flipkartclone.com>',
                    to: email,
                    subject: `Order Confirmation - ${order.orderId}`,
                    text: `Hello ${shippingAddress.name},\n\nYour order ${order.orderId} has been confirmed. Total amount: ₹${totalAmount}.\n\nThank you for shopping with us!`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px;">
                            <h2>Order Confirmed! 🎉</h2>
                            <p>Hello <b>${shippingAddress.name}</b>,</p>
                            <p>Your order <b>${order.orderId}</b> has been placed successfully and is being processed.</p>
                            <p><b>Total Amount:</b> ₹${totalAmount}</p>
                            <h3>Delivery Address:</h3>
                            <p>${shippingAddress.address}<br/>${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}</p>
                            <br/>
                            <p>Thank you for shopping with us!</p>
                        </div>
                    `
                });
                console.log('Order confirmation email sent:', info.messageId);
            } catch (err) {
                console.log('Failed to send order confirmation email:', err.message);
                // We don't fail the order creation if email fails
            }
        }

        return response.status(201).json(order);
    } catch (error) {
        console.log('Error creating order:', error);
        response.status(500).json({ message: error.message });
    }
};

export const getOrdersByUser = async (request, response) => {
    try {
        const { username } = request.params;
        const orders = await Order.findAll({ 
            where: { username: username || 'guest' },
            order: [['createdAt', 'DESC']]
        });
        return response.json(orders);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (request, response) => {
    try {
        const order = await Order.findOne({ where: { orderId: request.params.id } });
        if (order) {
            return response.json(order);
        }
        return response.status(404).json({ message: 'Order not found' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
