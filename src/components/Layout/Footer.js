import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  background: #1a1a1a;
  color: #fff;
  text-align: center;
  padding: 1rem;
`;

function Footer() {
  return <FooterStyled>© 2025 GlowTech</FooterStyled>;
}

export default Footer; // Ensure this line exists