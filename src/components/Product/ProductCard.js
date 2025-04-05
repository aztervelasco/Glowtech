import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styled from 'styled-components';

const Card = styled.div`
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px #00ffcc;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px #00ffcc;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductName = styled.h3`
  color: #fff;
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  color: #00ffcc;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;

const Specs = styled.ul`
  color: #ccc;
  font-size: 0.8rem;
  margin: 0.5rem 0;
  padding-left: 1rem;
`;

const Rating = styled.div`
  color: #ffd700;
  font-size: 0.9rem;
`;

const Review = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #ccc;
`;

const AddToCartButton = styled.button`
  background: #00ffcc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s;
  width: 100%;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 20px #00ffcc;
  text-align: center;
  animation: glow 1.5s infinite alternate;
  max-width: 400px;
  width: 90%;

  @keyframes glow {
    from {
      box-shadow: 0 0 10px #00ffcc;
    }
    to {
      box-shadow: 0 0 30px #00ffcc;
    }
  }
`;

const ModalText = styled.p`
  color: #fff;
  margin-bottom: 1.5rem;
`;

const ModalButton = styled.button`
  background: #00ffcc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 15px #00ffcc;
    transform: scale(1.05);
  }
`;

const CancelButton = styled(ModalButton)`
  background: #ff5555;
  &:hover {
    box-shadow: 0 0 15px #ff5555;
  }
`;

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const confirmAddToCart = () => {
    addToCart(product);
    setIsModalOpen(false);
    alert(`${product.name} has been added to your cart!`);
  };

  const cancelAddToCart = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <Link to={`/product/${product.id}`}>
          <ProductImage src={product.image} alt={product.name} />
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price}</ProductPrice>
          <Description>
            {product.description || 'A high-performance gadget for tech enthusiasts.'}
          </Description>
          <Specs>
            <li>Brand: {product.brand || 'GlowTech'}</li>
            <li>Warranty: {product.warranty || '1 Year'}</li>
            <li>Rating: {product.rating || '4.5/5'}</li>
          </Specs>
          <Rating>★★★★☆ ({product.reviews})</Rating>
          {product.userReviews.map((review) => (
            <Review key={review.id}>
              <strong>{review.user}</strong>: {review.comment} ({review.rating}/5)
            </Review>
          ))}
        </Link>
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
      </Card>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>Are you sure you want to add {product.name} to your cart?</ModalText>
            <ModalButton onClick={confirmAddToCart}>Yes, Add to Cart</ModalButton>
            <CancelButton onClick={cancelAddToCart}>Cancel</CancelButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default ProductCard;