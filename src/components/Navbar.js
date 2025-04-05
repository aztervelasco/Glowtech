import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaShoppingCart, FaUser, FaSignInAlt, FaSignOutAlt, FaAngleDown } from 'react-icons/fa'; // Import icons

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #2a2a2a;
  box-shadow: 0 2px 10px #00ffcc;
`;

const Logo = styled(Link)`
  color: #00ffcc;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 0 5px #00ffcc;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background: #3a3a3a;
  color: #ccc;
  width: 300px;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #00ffcc;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem; /* Increased gap between links */
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Gap between icon and text */
  transition: color 0.3s;

  &:hover {
    color: #00ffcc;
    text-shadow: 0 0 5px #00ffcc;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #00ffcc;
    text-shadow: 0 0 5px #00ffcc;
  }
`;

const DropdownIcon = styled(FaAngleDown)`
  font-size: 0.8rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #2a2a2a;
  border-radius: 5px;
  box-shadow: 0 2px 10px #00ffcc;
  display: none;
  flex-direction: column;
  z-index: 1000;

  ${ProfileContainer}:hover & {
    display: flex;
  }
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  color: #ccc;
  text-align: left;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #00ffcc;
    text-shadow: 0 0 5px #00ffcc;
  }
`;

function Navbar({ setSearchQuery }) {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return null; // Don't render the navbar until auth state is loaded
  }

  return (
    <NavbarContainer>
      <Logo to="/">GlowTech</Logo>
      <SearchBar
        type="text"
        placeholder="Search gadgets..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <NavLinks>
        <NavLink to="/">
          <FaHome /> Home
        </NavLink>
        <NavLink to="/cart">
          <FaShoppingCart /> Cart
        </NavLink>
        {user ? (
          <ProfileContainer>
            <FaUser /> Hello {user.username} <DropdownIcon />
            <DropdownMenu>
              <DropdownItem onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </DropdownItem>
            </DropdownMenu>
          </ProfileContainer>
        ) : (
          <>
            <NavLink to="/login">
              <FaSignInAlt /> Login
            </NavLink>
            <NavLink to="/register">
              <FaUser /> Register
            </NavLink>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;