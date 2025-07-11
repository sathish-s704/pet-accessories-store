import Order from "../models/Order.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Orders by User (User)
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("products.product", "name price");
  res.json(orders);
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
  res.json(orders);
};

// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  const { deliveryStatus, paymentStatus } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (deliveryStatus) order.deliveryStatus = deliveryStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();
  res.json(order);
};

// Delete Order (Admin)
export const deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json({ message: "Order deleted" });
};
