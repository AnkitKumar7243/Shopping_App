import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { clearNotification } from '../../redux/slices/uiSlice';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.space[6]};
  right: ${({ theme }) => theme.space[6]};
  width: 300px;
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  z-index: ${({ theme }) => theme.zIndices.toast};
  animation: ${slideIn} 0.3s ease forwards, ${slideOut} 0.3s ease forwards 4.7s;
`;

const NotificationTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space[2]};
  right: ${({ theme }) => theme.space[2]};
  background: none;
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const Notification = ({ status, title, message }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [dispatch]);
  
  const handleClose = () => {
    dispatch(clearNotification());
  };
  
  return (
    <NotificationContainer status={status}>
      <CloseButton onClick={handleClose}>×</CloseButton>
      <NotificationTitle>{title}</NotificationTitle>
      <NotificationMessage>{message}</NotificationMessage>
    </NotificationContainer>
  );
};

export default Notification;
