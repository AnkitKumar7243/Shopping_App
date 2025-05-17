import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.space[10]};
  max-width: 600px;
  margin: 0 auto;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 80px;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin: ${({ theme }) => theme.space[4]} 0;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: all 0.3s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
    color: white;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const NotFoundPage = () => {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Message>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Message>
      <ButtonContainer>
        <PrimaryButton to="/">Back to Home</PrimaryButton>
        <SecondaryButton to="/products">Browse Products</SecondaryButton>
      </ButtonContainer>
    </Container>
  );
};

export default NotFoundPage;
