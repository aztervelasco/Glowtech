import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Import icons

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #1a1a1a;
  color: #fff;
`;

const MainContent = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background: #2a2a2a;
  box-shadow: 0 -2px 10px #00ffcc;
  width: 100%;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: #00ffcc;
  font-size: 1.2rem;
  transition: all 0.3s;

  &:hover {
    color: #fff;
    text-shadow: 0 0 5px #00ffcc;
    transform: scale(1.1);
  }
`;

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContainer>
            <Navbar setSearchQuery={setSearchQuery} />
            <MainContent>
              <Routes>
                <Route path="/" element={<Home searchQuery={searchQuery} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </MainContent>
            <Footer>
              © 2025 GlowTech
              <SocialLinks>
                <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </SocialLink>
                <SocialLink href="mailto:example@gmail.com">
                  <FaEnvelope />
                </SocialLink>
                <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </SocialLink>
              </SocialLinks>
            </Footer>
          </AppContainer>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;