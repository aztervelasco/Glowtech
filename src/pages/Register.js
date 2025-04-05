import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const RegisterContainer = styled.div`
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

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
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
  transition: all 0.3s;
  width: 100%;
  max-width: 200px;
  animation: glow 1.5s infinite alternate;
  &:hover {
    box-shadow: 0 0 15px #00ffcc;
    transform: scale(1.05);
  }
  &:disabled {
    background: #666;
    cursor: not-allowed;
    animation: none;
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
`;

const ErrorMessage = styled.p`
  color: #ff5555;
  margin-top: 1rem;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: #00ffcc;
  margin-top: 1rem;
  text-align: center;
`;

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await register(username, email, password);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </ButtonContainer>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </RegisterContainer>
  );
}

export default Register;