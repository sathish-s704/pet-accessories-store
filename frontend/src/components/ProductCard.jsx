import { Card, Button } from "react-bootstrap";

function ProductCard({ product, onAddToCart }) {
 const imageUrl = product.imageUrl
  ? `http://localhost:3000/${product.imageUrl.replace(/\\/g, '/')}`
  : 'https://via.placeholder.com/200x200?text=No+Image';


  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={imageUrl}
        style={{ height: "220px", objectFit: "cover" }}
        alt={product.name}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted">{product.category}</Card.Text>
        <Card.Text>
          <strong>₹{product.price}</strong>
        </Card.Text>
        <Card.Text>
          {product.inStock ? (
            <span className="text-success">In Stock</span>
          ) : (
            <span className="text-danger">Out of Stock</span>
          )}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
