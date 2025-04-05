import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const CartContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 0 10px #00ffcc;
  max-width: 600px;
  width: 90%; /* Ensure it’s responsive on smaller screens */
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px #00ffcc; /* Increase glow on hover */
  }
`;

const CartTitle = styled.h2`
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
  margin-bottom: 1rem;
`;

const ItemCount = styled.p`
  color: #ccc;
  margin-bottom: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 10px #00ffcc;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
  color: #ccc;
`;

const ItemName = styled.p`
  margin: 0;
  font-weight: bold;
`;

const ItemPrice = styled.p`
  margin: 0;
  color: #00ffcc;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;

const QuantityButton = styled.button`
  background: #00ffcc;
  border: none;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px #00ffcc;
    transform: scale(1.05);
  }
`;

const QuantityText = styled.span`
  color: #ccc;
`;

const RemoveButton = styled.button`
  background: #ff5555;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px #ff5555;
    transform: scale(1.05);
  }
`;

const TotalPrice = styled.p`
  color: #00ffcc;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const CheckoutButton = styled(Link)`
  background: #00ffcc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  transition: all 0.3s;
  width: 100%;
  max-width: 200px;
  text-align: center;
  animation: glow 1.5s infinite alternate;

  &:hover {
    box-shadow: 0 0 15px #00ffcc;
    transform: scale(1.05);
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 5px #00ffcc;
    }
    to {
      box-shadow: 0 0 15px #00ffcc;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

const EmptyCartMessage = styled.p`
  color: #ccc;
  text-align: center;
`;

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate total number of items and total price
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  if (cart.length === 0) {
    return (
      <CartContainer>
        <CartTitle>Your Cart</CartTitle>
        <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>Your Cart</CartTitle>
      <ItemCount>{totalItems} item{totalItems !== 1 ? 's' : ''}</ItemCount>
      {cart.map((item) => (
        <CartItem key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          <ItemDetails>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>${item.price}</ItemPrice>
            <QuantitySelector>
              <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</QuantityButton>
              <QuantityText>{item.quantity}</QuantityText>
              <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QuantityButton>
            </QuantitySelector>
          </ItemDetails>
          <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
        </CartItem>
      ))}
      <TotalPrice>Total: ${totalPrice}</TotalPrice>
      <ButtonContainer>
        <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
      </ButtonContainer>
    </CartContainer>
  );
}

export default Cart;