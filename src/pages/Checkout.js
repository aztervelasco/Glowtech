import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

// Styled components
const CheckoutContainer = styled.div`
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
  max-width: 400px;
  width: 90%;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px #00ffcc; /* Increase glow on hover */
  }
`;

const Title = styled.h2`
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
  margin-bottom: 2rem;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  background: #2a2a2a;
  border-radius: 5px;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 5px;
`;

const Message = styled.p`
  color: #ccc;
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  background: #3a3a3a;
  color: #ccc;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #00ffcc;
  }
`;

const Button = styled.button`
  background: #00ffcc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s;
  width: 100%;
  max-width: 200px;
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
  gap: 1rem;
  width: 100%;
`;

function Checkout() {
  const { user, loading } = useAuth();
  const { cart } = useCart();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);

  if (loading) {
    return <CheckoutContainer>Loading...</CheckoutContainer>;
  }

  return (
    <CheckoutContainer>
      {step === 1 && (
        <div>
          <Title>Cart Review</Title>
          {cart.length === 0 ? (
            <Message>Your cart is empty.</Message>
          ) : (
            cart.map((item) => (
              <ProductItem key={item.id}>
                <ProductImage src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
              </ProductItem>
            ))
          )}
          {!user && (
            <>
              <Message>Please log in to proceed.</Message>
              <ButtonContainer>
                <Button onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate('/register')}>Register</Button>
              </ButtonContainer>
            </>
          )}
          {user && cart.length > 0 && (
            <ButtonContainer>
              <Button onClick={nextStep}>Proceed to Shipping</Button>
            </ButtonContainer>
          )}
        </div>
      )}
      {step === 2 && (
        <div>
          <Title>Shipping Details</Title>
          <form style={{ width: '100%' }}>
            <p>
              Address: <Input type="text" placeholder="Enter your address" />
            </p>
            <p>
              City: <Input type="text" placeholder="Enter your city" />
            </p>
            <p>
              Zip Code: <Input type="text" placeholder="Enter your zip code" />
            </p>
          </form>
          <ButtonContainer>
            <Button onClick={nextStep}>Proceed to Payment</Button>
          </ButtonContainer>
        </div>
      )}
      {step === 3 && (
        <div>
          <Title>Payment</Title>
          <form style={{ width: '100%' }}>
            <p>
              Card Number: <Input type="text" placeholder="Enter card number" />
            </p>
            <p>
              Expiry Date: <Input type="text" placeholder="MM/YY" />
            </p>
            <p>
              CVV: <Input type="text" placeholder="CVV" />
            </p>
          </form>
          <ButtonContainer>
            <Button onClick={() => setStep(4)}>Confirm Payment</Button>
          </ButtonContainer>
        </div>
      )}
      {step === 4 && (
        <div>
          <Title>Payment Successful</Title>
          <Message>Thank you for your purchase!</Message>
          <ButtonContainer>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </ButtonContainer>
        </div>
      )}
    </CheckoutContainer>
  );
}

export default Checkout;