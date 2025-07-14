import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error loading products:", err));
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4">🛍️ Our Products</h2>
      <Row>
        {products.length > 0 ? (
          products.map((p) => (
            <Col key={p._id} md={4}>
              <ProductCard product={p} />
            </Col>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Row>
    </Container>
  );
}

export default Products;
