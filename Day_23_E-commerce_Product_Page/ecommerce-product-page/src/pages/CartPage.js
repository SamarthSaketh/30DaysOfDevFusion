import React, { useState } from 'react';
import { Table, Button, Image, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CartPage({ cartItems, onAddToCart, onRemoveFromCart, onClearCart }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'credit',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate payment processing
    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      setOrderPlaced(true);
      setShowCheckout(false);
      onClearCart();  // Clear cart after order placed
      // Reset form data if you want (optional)
      setFormData({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        paymentMethod: 'credit',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll top to show alert
    }, 2500); // 2.5 seconds delay to mimic payment API
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="text-center mt-5">
        <h3>Your cart is empty</h3>
        <Link to="/">
          <Button variant="primary" className="mt-3">
            Go Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Shopping Cart</h1>

      {orderPlaced && (
        <Alert variant="success">
          Thank you for your order, {formData.fullName}! Your payment was successful.
        </Alert>
      )}

      {!orderPlaced && (
        <>
          <div className="mb-3 d-flex justify-content-between">
            <Button variant="danger" onClick={onClearCart} disabled={processingPayment}>
              Clear Cart
            </Button>
            <Link to="/">
              <Button variant="secondary">
                Home
              </Button>
            </Link>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th style={{ width: '150px' }}>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      rounded
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      className="me-3"
                    />
                    {item.name}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onRemoveFromCart(item)}
                        disabled={processingPayment}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onAddToCart(item)}
                        disabled={processingPayment}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
            <div>
              <strong>Total Items:</strong> {totalItems}
            </div>
            <div>
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </div>
            <Button
              variant="success"
              onClick={() => setShowCheckout(true)}
              disabled={processingPayment}
            >
              Checkout
            </Button>
          </div>

          {showCheckout && (
            <Form onSubmit={handleSubmit} className="border p-3 rounded">
              <h3>Shipping Address</h3>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={processingPayment}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={processingPayment}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled={processingPayment}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="zip">
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  disabled={processingPayment}
                />
              </Form.Group>

              <h3>Payment Method</h3>
              <Form.Check
                type="radio"
                id="credit"
                name="paymentMethod"
                label="Credit Card"
                value="credit"
                checked={formData.paymentMethod === 'credit'}
                onChange={handleChange}
                className="mb-2"
                disabled={processingPayment}
              />
              <Form.Check
                type="radio"
                id="paypal"
                name="paymentMethod"
                label="PayPal"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleChange}
                className="mb-2"
                disabled={processingPayment}
              />
              <Form.Check
                type="radio"
                id="cod"
                name="paymentMethod"
                label="Cash on Delivery"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleChange}
                className="mb-3"
                disabled={processingPayment}
              />

              <Button type="submit" variant="primary" disabled={processingPayment}>
                {processingPayment ? (
                  <>
                    <Spinner animation="border" size="sm" /> Processing Payment...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </Form>
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;
