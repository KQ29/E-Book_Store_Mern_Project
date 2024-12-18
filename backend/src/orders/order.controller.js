// order.controller.js

const Order = require('./order.model');

const createAOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error('Error creating order', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email })
      .populate('productIds') // Populate product details
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this email' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
};
