import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ConfirmationContainer = styled.div`
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 0 10px #00ffcc;
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
`;

function OrderConfirmation() {
  return (
    <ConfirmationContainer>
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase. You’ll receive a confirmation email shortly.</p>
      <Link to="/">Continue Shopping</Link>
    </ConfirmationContainer>
  );
}

export default OrderConfirmation;