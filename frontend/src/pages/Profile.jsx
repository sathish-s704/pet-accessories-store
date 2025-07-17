import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Card, Alert, Image } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProfile(res.data);
      setFormData({
        name: res.data.name || "",
        phone: res.data.phone || "",
        address: res.data.address || {
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        },
      });
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders/my", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "zip", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/user/profile", formData, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      alert("Profile updated!");
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update");
    }
  };

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">👤 User Profile</h3>

      {!editMode ? (
        <>
          <Row className="mb-3">
            <Col><strong>Name:</strong> {profile.name}</Col>
            <Col><strong>Email:</strong> {profile.email}</Col>
          </Row>
          <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
          <p><strong>Address:</strong> {profile?.address?.street}, {profile?.address?.city}, {profile?.address?.state}, {profile?.address?.zip}, {profile?.address?.country}</p>
          <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
        </>
      ) : (
        <Form onSubmit={handleUpdate}>
          <Row className="mb-3">
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} />
            </Col>
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control value={profile.email} readOnly />
            </Col>
          </Row>
          <Form.Group className="mb-2"><Form.Label>Phone</Form.Label>
            <Form.Control name="phone" value={formData.phone} onChange={handleChange} />
          </Form.Group>
          {["street", "city", "state", "zip", "country"].map((field, i) => (
            <Form.Group className="mb-2" key={i}>
              <Form.Label>{field[0].toUpperCase() + field.slice(1)}</Form.Label>
              <Form.Control name={field} value={formData.address[field]} onChange={handleChange} />
            </Form.Group>
          ))}
          <Button type="submit" variant="primary" className="me-2">Update</Button>
          <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
        </Form>
      )}

      <hr className="my-4" />

      <h4>❤️ Wishlist</h4>
      <Row>
        {wishlist.length > 0 ? wishlist.map(product => (
          <Col md={4} key={product._id} className="mb-3">
            <Card>
              <Card.Img variant="top" src={`/${product.imageUrl}`} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )) : <p>No items in wishlist.</p>}
      </Row>

      <hr className="my-4" />

      <h4>🧾 My Orders</h4>
      {orders.length > 0 ? orders.map(order => (
        <Card key={order._id} className="mb-3">
          <Card.Header>Order ID: {order._id}</Card.Header>
          <Card.Body>
            {order.products.map(({ name, price, quantity, imageUrl }, idx) => (
              <div key={idx} className="mb-2 d-flex align-items-center gap-3">
                {imageUrl && <Image src={`/${imageUrl}`} height={60} width={60} thumbnail />} 
                <div><strong>{name}</strong> - ₹{price} × {quantity}</div>
              </div>
            ))}
            <div className="mt-2 text-muted">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</div>
          </Card.Body>
        </Card>
      )) : <p>No orders yet.</p>}
    </Container>
  );
};

export default Profile;
