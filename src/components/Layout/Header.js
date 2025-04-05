import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaShoppingCart, FaHome } from 'react-icons/fa';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  background: #1a1a1a;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 0 10px #00ffcc;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 20px;
  background: #2a2a2a;
  color: #fff;
  width: 500px;
  box-shadow: 0 0 5px #00ffcc;
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #00ffcc;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  right: 100px;
`;

const IconLink = styled(Link)`
  color: #fff;
  font-size: 1.2rem;
  &:hover {
    color: #00ffcc;
  }
`;

const UserContainer = styled.div`
  position: relative;
  display: flex;
  right: 1px;
  align-items: center;
  color: #fff;
  cursor: pointer;
`;

const UserIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 0.5rem;
  &:hover {
    color: #00ffcc;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: #2a2a2a;
  border-radius: 5px;
  box-shadow: 0 0 10px #00ffcc;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  color: #fff;
  &:hover {
    background: #00ffcc;
    color: #1a1a1a;
  }
`;

function Header({ searchQuery, onSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderStyled>
      <Logo>GlowTech</Logo>
      <SearchBar
        type="text"
        placeholder="Search gadgets..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
      <NavIcons>
        <IconLink to="/">
          <FaHome />
        </IconLink>
        <IconLink to="/cart">
          <FaShoppingCart />
        </IconLink>
        {user ? (
          <UserContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <UserIcon>
              <FaUser />
            </UserIcon>
            <span>{user.name}</span>
            <Dropdown isOpen={isDropdownOpen}>
              <DropdownItem>Points: 100</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          </UserContainer>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', marginRight: '1rem' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: '#00ffcc' }}>
              Register
            </Link>
          </>
        )}
      </NavIcons>
    </HeaderStyled>
  );
}

export default Header;