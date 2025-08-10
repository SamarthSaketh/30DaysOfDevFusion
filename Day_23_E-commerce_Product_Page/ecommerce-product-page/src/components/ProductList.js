import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

function ProductList({ products, cartItems, onAddToCart, onRemoveFromCart }) {
  return (
    <Row>
      {products.length === 0 ? (
        <p>No products found matching the filters.</p>
      ) : (
        products.map(product => {
          const cartItem = cartItems.find(item => item.id === product.id);
          return (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                cartItem={cartItem}
                onAdd={onAddToCart}
                onRemove={onRemoveFromCart}
              />
            </Col>
          );
        })
      )}
    </Row>
  );
}

export default ProductList;
