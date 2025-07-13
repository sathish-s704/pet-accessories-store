import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Our Products</h2>
      <Row>
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </Row>
    </Container>
  );
}

export default Products;
