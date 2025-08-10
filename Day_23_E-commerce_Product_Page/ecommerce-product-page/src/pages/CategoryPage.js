import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import FilterSidebar from '../components/FilterSidebar';
import products from '../data/products';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function CategoryPage({ cartItems, onAddToCart, onRemoveFromCart }) {
  const { categoryName } = useParams();

  const [filters, setFilters] = useState({
    priceRange: null,
    rating: null,
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (product.category.toLowerCase() !== categoryName.toLowerCase()) {
        return false;
      }
      if (filters.priceRange) {
        if (
          product.price < filters.priceRange.min ||
          product.price > filters.priceRange.max
        ) {
          return false;
        }
      }
      if (filters.rating && product.rating < filters.rating) {
        return false;
      }
      return true;
    });
  }, [categoryName, filters]);

  return (
    <div>
 <Button variant="secondary" className="mb-3" as={Link} to="/">
  ← Back to All Products
</Button>

      <h1 className="mb-4">Category: {categoryName}</h1>

      <Row>
        <Col md={3} className="mb-4">
          {/* Hide category filter on category pages */}
          <FilterSidebar filters={filters} setFilters={setFilters} showCategoryFilter={false} />
        </Col>

        <Col md={9}>
          <ProductList
            products={filteredProducts}
            cartItems={cartItems}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CategoryPage;
