import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { ShoppingCart, Login, PersonAdd, AdminPanelSettings } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Optional
    alert("Logged out successfully");
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">🐾 Pet Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <ShoppingCart />
            </Nav.Link>

            {user ? (
              <>
                {user.role === 'user' && (
                  <Nav.Link as={Link} to="/profile">👤 Profile</Nav.Link>
                )}
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin/dashboard">
                    <AdminPanelSettings style={{ verticalAlign: 'middle' }} /> Admin Dashboard
                  </Nav.Link>
                )}
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  <PersonAdd style={{ verticalAlign: 'middle' }} /> Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <Login style={{ verticalAlign: 'middle' }} /> Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
