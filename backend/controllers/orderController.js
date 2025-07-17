import Order from "../models/Order.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const snapshotProducts = [];

    for (const item of products) {
      const prod = await Product.findById(item.product);
      if (!prod) {
        return res.status(400).json({ message: `Product ${item.product} not found` });
      }

      snapshotProducts.push({
        product: prod._id,
        name: prod.name,
        price: prod.price,
        imageUrl: prod.imageUrl,
        quantity: item.quantity || 1
      });
    }

    const order = await Order.create({
      user: req.user._id,
      products: snapshotProducts,
      totalAmount
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Orders by User
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product", "name price imageUrl");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
