import { Card, Button } from 'react-bootstrap';
import { AddShoppingCart } from '@mui/icons-material';

function ProductCard({ product }) {
  return (
    <Card className="m-3 shadow-sm" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>₹{product.price}</Card.Text>
        <Button variant="outline-primary">
          <AddShoppingCart /> Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
