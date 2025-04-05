import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

// Define all products (same as in Home.js)
const allProducts = [
  {
    id: 1,
    name: 'AMD Ryzen 9 7950X Processor',
    price: 32.395,
    image: '/image/AMD_Ryzen9.webp',
    description: 'A powerful processor for gaming and productivity with 16 cores and 32 threads.',
    brand: 'AMD',
    warranty: '3 Years',
    rating: '4.8/5',
    reviews: 124,
    userReviews: [
      { id: 1, user: 'John', comment: 'Incredible performance!', rating: 5 },
      { id: 2, user: 'Jane', comment: 'Great for gaming.', rating: 4 },
    ],
  },
  {
    id: 2,
    name: 'MacBook Pro 16 (M2 Max)',
    price: 13.99,
    image: '/image/Apple_m2.jpeg',
    description: 'A high-performance laptop with the M2 Max chip, ideal for creative professionals.',
    brand: 'Apple',
    warranty: '1 Year',
    rating: '4.9/5',
    reviews: 89,
    userReviews: [
      { id: 1, user: 'Alice', comment: 'Best laptop ever!', rating: 5 },
      { id: 2, user: 'Bob', comment: 'Battery life is amazing.', rating: 4 },
    ],
  },
  {
    id: 3,
    name: 'Razer Blade',
    price: 99.99,
    image: '/image/Razer_Blade.jpeg',
    description: 'A sleek gaming laptop with a 15.6" display and powerful NVIDIA GPU.',
    brand: 'Razer',
    warranty: '2 Years',
    rating: '4.6/5',
    reviews: 124,
    userReviews: [
      { id: 1, user: 'Charlie', comment: 'Sleek design!', rating: 5 },
      { id: 2, user: 'Diana', comment: 'Runs games smoothly.', rating: 4 },
    ],
  },
  {
    id: 4,
    name: 'NVIDIA GeForce RTX 4090 Graphics Card',
    price: 49.99,
    image: '/image/GeForce-RTX@-4090-GAMING-X-TRIO-24G.webp',
    description: 'A top-tier graphics card with 24GB GDDR6X memory for 4K gaming.',
    brand: 'NVIDIA',
    warranty: '3 Years',
    rating: '4.7/5',
    reviews: 89,
    userReviews: [
      { id: 1, user: 'Eve', comment: 'Top-notch performance!', rating: 5 },
      { id: 2, user: 'Frank', comment: 'A bit pricey but worth it.', rating: 4 },
    ],
  },
  {
    id: 5,
    name: 'Logitech G Pro X Mechanical Gaming Keyboard',
    price: 99.99,
    image: '/image/logitech-g-pro-x-keyboard.jpg',
    description: 'A compact mechanical keyboard with swappable switches for gamers.',
    brand: 'Logitech',
    warranty: '2 Years',
    rating: '4.8/5',
    reviews: 124,
    userReviews: [
      { id: 1, user: 'Grace', comment: 'Love the clicky feel!', rating: 5 },
      { id: 2, user: 'Henry', comment: 'Great for typing.', rating: 4 },
    ],
  },
  {
    id: 6,
    name: 'SteelSeries Arctis Nova Pro Wireless Headset',
    price: 49.99,
    image: '/image/headset.webp',
    description: 'A wireless gaming headset with high-fidelity audio and active noise cancellation.',
    brand: 'SteelSeries',
    warranty: '1 Year',
    rating: '4.7/5',
    reviews: 89,
    userReviews: [
      { id: 1, user: 'Ivy', comment: 'Amazing sound quality!', rating: 5 },
      { id: 2, user: 'Jack', comment: 'Comfortable for long sessions.', rating: 4 },
    ],
  },
  {
    id: 7,
    name: 'Secretlab Titan Evo 2023 Gaming Chair',
    price: 99.99,
    image: '/image/Chair.jpg',
    description: 'An ergonomic gaming chair with adjustable lumbar support and 4D armrests.',
    brand: 'Secretlab',
    warranty: '5 Years',
    rating: '4.9/5',
    reviews: 124,
    userReviews: [
      { id: 1, user: 'Kelly', comment: 'Super comfy!', rating: 5 },
      { id: 2, user: 'Liam', comment: 'Great support for my back.', rating: 4 },
    ],
  },
  {
    id: 8,
    name: 'Corsair Vengeance DDR5 32GB RAM Kit',
    price: 49.99,
    image: '/image/Corsair_Vengeance_Ram.webp',
    description: 'High-speed DDR5 RAM with 32GB capacity for gaming and multitasking.',
    brand: 'Corsair',
    warranty: 'Lifetime',
    rating: '4.8/5',
    reviews: 89,
    userReviews: [
      { id: 1, user: 'Mia', comment: 'Fast and reliable!', rating: 5 },
      { id: 2, user: 'Noah', comment: 'Perfect for my build.', rating: 4 },
    ],
  },
  {
    id: 9,
    name: 'Neon Mouse',
    price: 49.99,
    image: '/image/mouse.webp',
    description: 'A stylish gaming mouse with customizable RGB lighting and high DPI.',
    brand: 'NeonTech',
    warranty: '1 Year',
    rating: '4.6/5',
    reviews: 89,
    userReviews: [
      { id: 1, user: 'Olivia', comment: 'Love the glow effect!', rating: 5 },
      { id: 2, user: 'Peter', comment: 'Very responsive.', rating: 4 },
    ],
  },
  {
    id: 10,
    name: 'SkyMaster Pro Drone with 4K Camera',
    price: 299.99,
    image: '/image/recommended/Mini_drone.jpeg',
    description: 'Capture stunning aerial footage with this 4K drone, perfect for beginners and pros.',
    brand: 'SkyMaster',
    warranty: '1 Year',
    rating: '4.7/5',
    reviews: 56,
    userReviews: [
      { id: 1, user: 'Quinn', comment: 'Stunning aerial shots!', rating: 5 },
      { id: 2, user: 'Rachel', comment: 'Easy to fly.', rating: 4 },
    ],
  },
  {
    id: 11,
    name: 'ThunderCharge 200W Smart Cable',
    price: 29.99,
    image: '/image/recommended/typeC_charger.png',
    description: 'A smart USB-C cable with 200W fast charging and a digital power display.',
    brand: 'ThunderCharge',
    warranty: '1 Year',
    rating: '4.6/5',
    reviews: 72,
    userReviews: [
      { id: 1, user: 'Sam', comment: 'Charges super fast!', rating: 5 },
      { id: 2, user: 'Tina', comment: 'Love the power display.', rating: 4 },
    ],
  },
  {
    id: 12,
    name: 'JBL Pulse 5 Party Speaker',
    price: 249.99,
    image: '/image/recommended/Speaker.webp',
    description: 'A portable party speaker with 360-degree sound and customizable LED lights.',
    brand: 'JBL',
    warranty: '1 Year',
    rating: '4.8/5',
    reviews: 65,
    userReviews: [
      { id: 1, user: 'Uma', comment: 'Lights and sound are amazing!', rating: 5 },
      { id: 2, user: 'Victor', comment: 'Perfect for parties.', rating: 4 },
    ],
  },
  {
    id: 13,
    name: 'CyberBeats Wireless Gaming Earbuds',
    price: 79.99,
    image: '/image/recommended/wireless.webp',
    description: 'Low-latency wireless earbuds designed for gaming with immersive sound.',
    brand: 'CyberBeats',
    warranty: '1 Year',
    rating: '4.5/5',
    reviews: 48,
    userReviews: [
      { id: 1, user: 'Wendy', comment: 'Great sound for gaming!', rating: 5 },
      { id: 2, user: 'Xander', comment: 'Comfortable fit.', rating: 4 },
    ],
  },
  {
    id: 14,
    name: 'Fugeza Pro Wireless Microphone',
    price: 59.99,
    image: '/image/recommended/mini_mic.jpeg',
    description: 'A compact wireless microphone for vlogging and streaming with clear audio.',
    brand: 'Fugeza',
    warranty: '1 Year',
    rating: '4.6/5',
    reviews: 33,
    userReviews: [
      { id: 1, user: 'Yara', comment: 'Perfect for vlogging!', rating: 5 },
      { id: 2, user: 'Zack', comment: 'Clear audio quality.', rating: 4 },
    ],
  },
  {
    id: 15,
    name: 'UltraShield SSD/HDD External Case',
    price: 39.99,
    image: '/image/recommended/SSD.jpg',
    description: 'A durable external case for SSD/HDD with USB-C 3.2 support.',
    brand: 'UltraShield',
    warranty: '2 Years',
    rating: '4.5/5',
    reviews: 29,
    userReviews: [
      { id: 1, user: 'Amy', comment: 'Fast data transfer!', rating: 5 },
      { id: 2, user: 'Ben', comment: 'Durable build.', rating: 4 },
    ],
  },
  {
    id: 16,
    name: 'Solar Battery Power Bank',
    price: 199.99,
    image: '/image/recommended/solar.bp.png',
    description: 'A solar-powered power bank with 20000mAh capacity for outdoor use.',
    brand: 'SolarTech',
    warranty: '1 Year',
    rating: '4.7/5',
    reviews: 56,
    userReviews: [
      { id: 1, user: 'Charlie', comment: 'Amazing POWER BANKSS!!', rating: 5 },
      { id: 2, user: 'Diana', comment: 'Worth the price.', rating: 4 },
    ],
  },
  {
    id: 17,
    name: 'Glow Keyboard',
    price: 99.89,
    image: '/image/glow_keyboard.jpg',
    description: 'A high-performance keyboard with customizable RGB lighting.',
    brand: 'GlowTech',
    warranty: '2 Years',
    rating: '4.5/5',
    reviews: 50,
    userReviews: [
      { id: 1, user: 'John', comment: 'Great product!', rating: 5 },
      { id: 2, user: 'Jane', comment: 'Works well.', rating: 4 },
    ],
  },
];

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px); /* Adjust for navbar and footer */
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 0 10px #00ffcc;
  max-width: 800px;
  margin: 0 auto;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px #00ffcc;
  margin-bottom: 1rem;
`;

const ProductName = styled.h2`
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.p`
  color: #00ffcc;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  color: #ccc;
  text-align: center;
  margin-bottom: 2rem;
`;

const ReviewsSection = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const ReviewsTitle = styled.h3`
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
  margin-bottom: 1rem;
`;

const Review = styled.div`
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const AddToCartButton = styled.button`
  background: #00ffcc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
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

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find the product by ID
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <ProductContainer>Product not found.</ProductContainer>;
  }

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const confirmAddToCart = () => {
    // Ensure the product object has all necessary fields
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      brand: product.brand,
      warranty: product.warranty,
      rating: product.rating,
      reviews: product.reviews,
      userReviews: product.userReviews,
    };
    addToCart(productToAdd);
    setIsModalOpen(false);
    alert(`${product.name} has been added to your cart!`);
  };

  const cancelAddToCart = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ProductContainer>
        <ProductName>{product.name}</ProductName>
        <ProductImage src={product.image} alt={product.name} />
        <ProductPrice>${product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
        <ReviewsSection>
          <ReviewsTitle>Reviews</ReviewsTitle>
          {product.userReviews.map((review) => (
            <Review key={review.id}>
              <strong>{review.user}</strong>: {review.comment} ({review.rating}/5)
            </Review>
          ))}
        </ReviewsSection>
      </ProductContainer>
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

export default ProductDetail;