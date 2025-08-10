import React, { useState, useMemo } from 'react';
import { Container, Navbar, Nav, Badge, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import FilterSidebar from './components/FilterSidebar';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';  // Import CartPage
import products from './data/products';
import 'rc-slider/assets/index.css';

const allCategories = ['Electronics', 'Footwear', 'Accessories', 'Clothing', 'Books'];

function HomePage({ cartItems, onAddToCart, onRemoveFromCart, filters, setFilters }) {
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
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
  }, [filters]);

  return (
    <Container>
      {/* Category navigation */}
      <ButtonGroup className="mb-3">
        {allCategories.map(category => (
          <Button
            as={Link}
            key={category}
            to={`/category/${category.toLowerCase()}`}
            variant="outline-primary"
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>

      <Row>
        <Col md={3} className="mb-4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </Col>
        <Col md={9}>
          <h1 className="mb-4">Products</h1>
          <ProductList
            cartItems={cartItems}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            products={filteredProducts}
          />
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: null,
    rating: null,
  });

  // Add this handler to clear the entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // existing handlers...
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const item = prevItems.find(item => item.id === product.id);
      if (!item) return prevItems;
      if (item.quantity === 1) {
        return prevItems.filter(i => i.id !== product.id);
      } else {
        return prevItems.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
    });
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            E-commerce Store
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/cart">
              Cart <Badge bg="light" text="dark">{totalQuantity}</Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <HomePage
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            filters={filters}
            setFilters={setFilters}
          />
        }/>

        <Route path="/category/:categoryName" element={
          <CategoryPage
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        }/>

        <Route path="/cart" element={
          <CartPage
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}  // <-- Pass this prop
          />
        }/>
      </Routes>
    </>
  );
}


export default App;
