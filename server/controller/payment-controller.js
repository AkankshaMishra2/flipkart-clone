import Order from "../model/Order.js";
import Razorpay from "razorpay";

export const createOrder = async (request, response) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    const options = {
      amount: request.body.price,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) return response.status(500).send("Some error occured");
    response.send(order);
  } catch (error) {
    response.status(500).send(error);
  }
};

export const payOrder = async (request, response) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } = request.body;
    await Order.create({
      isPaid: true,
      amount: amount,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    });
    response.send({ msg: "payment was successful" });
  } catch (error) {
    response.status(500).send(error);
  }
};

export const paymentResponse = async (request, response) => {
  try {
    const orders = await Order.findAll();
    response.send(orders);
  } catch (error) {
    response.status(500).send(error.message);
  }
};
