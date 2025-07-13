import axios from "axios";
import dotenv from "dotenv";
import Order from "../models/Order.js";
dotenv.config();

// 🔐 Generate PayPal Access Token
const generateAccessToken = async () => {
  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API } = process.env;
  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

  const response = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

// 🛒 Create PayPal Order
export const createPayPalOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const accessToken = await generateAccessToken();

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
    };

    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ paypalOrderId: response.data.id });
  } catch (err) {
    res.status(500).json({ message: "PayPal order creation failed", error: err.message });
  }
};

// ✅ Capture PayPal Payment & Update MongoDB Order
export const captureOrder = async (req, res) => {
  const { orderID } = req.params;
  const { localOrderId } = req.body;

  try {
    const accessToken = await generateAccessToken();

    const { data } = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 🛠 Update local MongoDB order
    const order = await Order.findById(localOrderId);
    if (!order) return res.status(404).json({ message: "Local order not found" });

    order.paymentStatus = "Paid";
    order.paidAt = new Date();
    order.paymentResult = {
      paypalOrderId: data.id,
      status: data.status,
      email: data.payer.email_address,
    };

    await order.save();

    res.json({ message: "Payment captured and order updated", order, paypal: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Payment capture failed", error: err.message });
  }
};
