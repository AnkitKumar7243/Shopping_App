import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { closeCart } from '../../redux/slices/uiSlice';
import CartItem from './CartItem';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndices.overlay};
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndices.modal};
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const CartHeader = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space[4]};
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space[8]} 0;
  
  p {
    margin-bottom: ${({ theme }) => theme.space[4]};
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const CartFooter = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.base};
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

const ViewCartButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space[3]};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.space[2]};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const CartSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  
  const handleClose = () => {
    dispatch(closeCart());
  };
  
  const handleViewCart = () => {
    dispatch(closeCart());
    navigate('/cart');
  };
  
  const handleCheckout = () => {
    dispatch(closeCart());
    navigate('/checkout');
  };
  
  return (
    <>
      <Overlay onClick={handleClose} />
      <Sidebar>
        <CartHeader>
          <CartTitle>Your Cart ({items.length})</CartTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </CartHeader>
        
        <CartContent>
          {items.length === 0 ? (
            <EmptyCart>
              <p>Your cart is empty</p>
            </EmptyCart>
          ) : (
            items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </CartContent>
        
        <CartFooter>
          <TotalRow>
            <span>Total:</span>
            <span>Rs. {totalAmount}</span>
          </TotalRow>
          
          <CheckoutButton 
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Checkout
          </CheckoutButton>
          
          <ViewCartButton onClick={handleViewCart}>
            View Cart
          </ViewCartButton>
        </CartFooter>
      </Sidebar>
    </>
  );
};

export default CartSidebar;
