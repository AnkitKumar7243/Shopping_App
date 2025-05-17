import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const ConfirmationCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[8]};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin: 0 auto ${({ theme }) => theme.space[6]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const OrderNumber = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.base};
  margin-bottom: ${({ theme }) => theme.space[6]};
  
  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.lightText};
  }
  
  h3 {
    margin: ${({ theme }) => theme.space[1]} 0 0;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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

const OrderDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const InfoBlock = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: ${({ theme }) => theme.space[2]};
    color: ${({ theme }) => theme.colors.lightText};
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin: 0;
  }
`;

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // If there are items in the cart, the user shouldn't be on this page
  useEffect(() => {
    if (items.length > 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  return (
    <PageContainer>
      <ConfirmationCard>
        <SuccessIcon>
          <i className="fas fa-check"></i>
        </SuccessIcon>
        
        <Title>Order Confirmed!</Title>
        <Message>
          Thank you for your purchase. Your order has been received and is being processed.
        </Message>
        
        <OrderNumber>
          <p>Order Number</p>
          <h3>{orderNumber}</h3>
        </OrderNumber>
        
        <Message>
          We've sent a confirmation email with your order details and tracking information.
        </Message>
        
        <ButtonContainer>
          <PrimaryButton to="/products">Continue Shopping</PrimaryButton>
          <SecondaryButton to="/">Back to Home</SecondaryButton>
        </ButtonContainer>
      </ConfirmationCard>
      
      <OrderDetails>
        <SectionTitle>Order Details</SectionTitle>
        
        <InfoGrid>
          <InfoBlock>
            <h3>Order Date</h3>
            <p>{new Date().toLocaleDateString()}</p>
          </InfoBlock>
          
          <InfoBlock>
            <h3>Payment Method</h3>
            <p>Credit Card</p>
          </InfoBlock>
          
          <InfoBlock>
            <h3>Shipping Method</h3>
            <p>Standard Delivery</p>
          </InfoBlock>
          
          <InfoBlock>
            <h3>Estimated Delivery</h3>
            <p>
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - 
              {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </InfoBlock>
        </InfoGrid>
        
        <SectionTitle>Shipping Address</SectionTitle>
        <p>
          123 Main Street<br />
          Apartment 4B<br />
          New Delhi, 110001<br />
          India
        </p>
      </OrderDetails>
    </PageContainer>
  );
};

export default OrderConfirmationPage;
