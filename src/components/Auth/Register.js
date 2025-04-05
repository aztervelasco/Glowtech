import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px); /* Adjust for navbar and footer */
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 15px;
  box-shadow: 0 0 20px #00ffcc;
  max-width: 400px;
  margin: 0 auto;
  animation: glow 1.5s infinite alternate;

  @keyframes glow {
    from {
      box-shadow: 0 0 10px #00ffcc;
    }
    to {
      box-shadow: 0 0 30px #00ffcc;
    }
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  color: #00ffcc;
  text-shadow: 0 0 10px #00ffcc;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #ccc;
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  background: #2a2a2a;
  color: #fff;
  width: 100%;
  box-shadow: 0 0 5px #00ffcc;
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #00ffcc;
  }
`;

const Button = styled.button`
  background: #00ffcc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 15px #00ffcc;
    transform: scale(1.05);
  }
`;

const SocialButton = styled(Button)`
  background: #555;
  margin-top: 0.5rem;
  &:hover {
    box-shadow: 0 0 15px #555;
  }
`;

const LinkText = styled.p`
  color: #00ffcc;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 5px #00ffcc;
  }
`;

function Register() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: email.split('@')[0], email });
    window.location.href = '/';
  };

  return (
    <FormContainer>
      <Logo>GlowTech</Logo>
      <Description>Create an account to unlock exclusive tech offers and personalized recommendations.</Description>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          required
        />
        <Button type="submit">Register</Button>
      </form>
      <SocialButton>Register with Google</SocialButton>
      <SocialButton>Register with Facebook</SocialButton>
      <LinkText>
        Already have an account? <Link to="/login">Login here</Link>
      </LinkText>
    </FormContainer>
  );
}

export default Register;