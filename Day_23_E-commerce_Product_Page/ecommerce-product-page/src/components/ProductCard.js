import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

function ProductCard({ product, cartItem, onAdd, onRemove }) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${product.price.toFixed(2)}</Card.Subtitle>
        <Card.Text>Rating: {product.rating} ⭐</Card.Text>

        {cartItem ? (
          <ButtonGroup aria-label="Quantity controls">
            <Button variant="danger" onClick={() => onRemove(product)}>-</Button>
            <Button variant="light" disabled>{cartItem.quantity}</Button>
            <Button variant="success" onClick={() => onAdd(product)}>+</Button>
          </ButtonGroup>
        ) : (
          <Button variant="primary" onClick={() => onAdd(product)}>
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
