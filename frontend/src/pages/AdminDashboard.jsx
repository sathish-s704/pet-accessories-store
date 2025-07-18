import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Button, ListGroup } from 'react-bootstrap';
import { Dashboard, ShoppingCart, People, ListAlt, AttachMoney, Logout } from '@mui/icons-material';

const AdminDashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Access control
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // State for summary data
  const [summary, setSummary] = useState({
    products: 0,
    users: 0,
    orders: 0,
    income: 0,
    orderHistory: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await axios.get('/api/products');
        // Fetch users
        const usersRes = await axios.get('/api/users');
        // Fetch orders
        const ordersRes = await axios.get('/api/orders');
        // Calculate income
        const orders = ordersRes.data || [];
        const income = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        setSummary({
          products: productsRes.data.length || 0,
          users: usersRes.data.length || 0,
          orders: orders.length,
          income,
          orderHistory: orders,
        });
      } catch (err) {
        // Do not set placeholder values
        setSummary({
          products: 0,
          users: 0,
          orders: 0,
          income: 0,
          orderHistory: [],
        });
      }
    };
    fetchData();
  }, []);

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Container fluid className="bg-light min-vh-100 p-0">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={2} className="bg-white shadow-sm d-flex flex-column min-vh-100 p-3">
          <h4 className="mb-4 text-primary"><Dashboard style={{verticalAlign:'middle'}} /> Admin</h4>
          <ListGroup variant="flush">
            <ListGroup.Item active className="border-0 bg-primary text-white">
              <Dashboard style={{verticalAlign:'middle'}} /> Dashboard
            </ListGroup.Item>
            <ListGroup.Item action className="border-0" onClick={()=>navigate('/admin/products')}>
              <ShoppingCart style={{verticalAlign:'middle'}} /> Products
            </ListGroup.Item>
            <ListGroup.Item action className="border-0" onClick={()=>navigate('/admin/users')}>
              <People style={{verticalAlign:'middle'}} /> Users
            </ListGroup.Item>
            <ListGroup.Item action className="border-0" onClick={()=>navigate('/admin/orders')}>
              <ListAlt style={{verticalAlign:'middle'}} /> Orders
            </ListGroup.Item>
            <ListGroup.Item action className="border-0" onClick={()=>navigate('/admin/income')}>
              <AttachMoney style={{verticalAlign:'middle'}} /> Income
            </ListGroup.Item>
            <ListGroup.Item action className="border-0 text-danger" onClick={handleLogout}>
              <Logout style={{verticalAlign:'middle'}} /> Logout
            </ListGroup.Item>
          </ListGroup>
        </Col>
        {/* Main Content */}
        <Col md={10} className="p-4">
          <h2 className="mb-4">Dashboard</h2>
          {/* Summary Cards */}
          <Row className="mb-4 g-3">
            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Total Products</Card.Title>
                  <Card.Text className="fs-3 fw-bold text-primary">{summary.products}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Total Users</Card.Title>
                  <Card.Text className="fs-3 fw-bold text-success">{summary.users}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text className="fs-3 fw-bold text-warning">{summary.orders}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Total Income</Card.Title>
                  <Card.Text className="fs-3 fw-bold text-danger">${summary.income}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* Order History Table */}
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Order History</Card.Title>
              <Table responsive hover className="mt-3">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User Name</th>
                    <th>Product Count</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.orderHistory.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user?.name || 'N/A'}</td>
                      <td>{order.products?.length || 0}</td>
                      <td>${order.total}</td>
                      <td>{order.status}</td>
                      <td>{order.createdAt?.slice(0,10)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard; 
