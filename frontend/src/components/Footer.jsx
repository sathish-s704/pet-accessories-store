import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5>🐾 Pet Accessories</h5>
            <p>Your one-stop shop for quality pet accessories and supplies.</p>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/products" className="footer-link">Products</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Follow Us</h6>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="social-icon"><Facebook /></a>
              <a href="#" className="social-icon"><Instagram /></a>
              <a href="#" className="social-icon"><Twitter /></a>
              <a href="#" className="social-icon"><LinkedIn /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />
        <p className="text-center mb-0">© {new Date().getFullYear()} Pet Accessories. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
