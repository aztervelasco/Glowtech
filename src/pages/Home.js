import React from 'react';
import ProductCard from '../components/Product/ProductCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.5rem;
  padding: 1rem;
`;

const Section = styled.div`
  margin-top: 2rem;
`;

const Heading = styled.h1`
  text-align: center;
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
`;

const SubHeading = styled.h2`
  text-align: center;
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
`;

const CarouselContainer = styled.div`
  margin-bottom: 2rem;
  max-width: 800px; /* Limit the width of the carousel */
  margin-left: auto; /* Center the carousel */
  margin-right: auto;
  .slick-slide img {
    width: 100%;
    height: 350px;
    object-fit: cover; /* Changed to cover for better image scaling */
    border-radius: 10px;
    box-shadow: 0 0 10px #00ffcc;
  }
`;

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
    image: '/image/AMD_Ryzen9.webp',
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

const products = allProducts.filter((product) => product.id <= 9); // IDs 1-9 for featured
const recommendedProducts = allProducts.filter((product) => product.id >= 10); // IDs 10+ for recommended

const allProductImages = allProducts.map((product) => product.image);

function Home({ searchQuery }) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container>
      <CarouselContainer>
        <Slider {...settings}>
          {allProductImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Featured Product ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </CarouselContainer>
      <Heading>Featured Tech Gadgets</Heading>
      <Grid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      <Section>
        <SubHeading>Recommended For You</SubHeading>
        <Grid>
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Section>
    </Container>
  );
}

export default Home;