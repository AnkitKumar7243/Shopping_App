import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import AuthModal from '../components/auth/AuthModal';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.space[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
`;

const CartItemsList = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space[10]};
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
  
  p {
    color: ${({ theme }) => theme.colors.lightText};
    margin-bottom: ${({ theme }) => theme.space[6]};
  }
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
    color: white;
  }
`;

const CartHeader = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ContinueShopping = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CartPage = () => {
  const { items, totalQuantity } = useSelector((state) => state.cart);
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Your Cart</PageTitle>
      </PageHeader>
      
      {items.length === 0 ? (
        <EmptyCart>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <ShopNowButton to="/products">Shop Now</ShopNowButton>
        </EmptyCart>
      ) : (
        <CartLayout>
          <CartItemsContainer>
            <CartHeader>
              <CartCount>{totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'}</CartCount>
              <ContinueShopping to="/products">Continue Shopping</ContinueShopping>
            </CartHeader>
            
            <CartItemsList>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </CartItemsList>
          </CartItemsContainer>
          
          <CartSummary />
        </CartLayout>
      )}
      
      <AuthModal />
    </PageContainer>
  );
};

export default CartPage;
