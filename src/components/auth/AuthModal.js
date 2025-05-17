import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure
} from '../../redux/slices/authSlice';
import { closeAuthModal, setAuthModalMode } from '../../redux/slices/uiSlice';
import { authAPI } from '../../services/api';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.space[6]};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  right: ${({ theme }) => theme.space[3]};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lightText};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.base};
  padding: ${({ theme }) => theme.space[3]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightText};
    cursor: not-allowed;
  }
`;

const SwitchModeText = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space[2]};
`;

const AuthModal = () => {
  const dispatch = useDispatch();
  const { showAuthModal, authModalMode } = useSelector((state) => state.ui);
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  if (!showAuthModal) {
    return null;
  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(loginStart());
      const userData = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });
      dispatch(loginSuccess(userData));
      dispatch(closeAuthModal());
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(registerStart());
      const userData = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      dispatch(registerSuccess(userData));
      dispatch(closeAuthModal());
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
  
  const switchMode = () => {
    dispatch(setAuthModalMode(authModalMode === 'login' ? 'register' : 'login'));
  };
  
  return (
    <ModalOverlay onClick={() => dispatch(closeAuthModal())}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => dispatch(closeAuthModal())}>
          ✕
        </CloseButton>
        
        <Title>
          {authModalMode === 'login' ? 'Login' : 'Create Account'}
        </Title>
        
        <Form onSubmit={authModalMode === 'login' ? handleLogin : handleRegister}>
          {authModalMode === 'register' && (
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
          )}
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <SubmitButton type="submit" disabled={loading}>
            {loading 
              ? 'Loading...' 
              : authModalMode === 'login' 
                ? 'Login' 
                : 'Register'
            }
          </SubmitButton>
        </Form>
        
        <SwitchModeText>
          {authModalMode === 'login' 
            ? "Don't have an account?" 
            : "Already have an account?"
          }
          <button type="button" onClick={switchMode}>
            {authModalMode === 'login' ? 'Register' : 'Login'}
          </button>
        </SwitchModeText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;
