import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const orders = await Order.find().populate("user", "name");
    const totalOrders = orders.length;
    const totalIncome = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalIncome,
      orders: orders.map(o => ({
        id: o._id,
        user: o.user?.name || "Unknown",
        count: o.products.length,
        total: o.totalPrice,
        status: o.status,
        date: o.createdAt.toISOString().split('T')[0]
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
