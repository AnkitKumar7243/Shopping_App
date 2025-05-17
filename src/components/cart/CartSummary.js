import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { clearCart } from '../../redux/slices/cartSlice';
import { showNotification } from '../../redux/slices/uiSlice';

const SummaryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[4]};
`;

const SummaryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[3]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[3]};
  
  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
`;

const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.lightText};
`;

const SummaryValue = styled.span`
  font-weight: ${({ theme, bold }) => bold ? theme.fontWeights.bold : theme.fontWeights.normal};
`;

const TotalRow = styled(SummaryRow)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding-top: ${({ theme }) => theme.space[3]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const PromoCodeContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const PromoCodeInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.base};
  margin-bottom: ${({ theme }) => theme.space[2]};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space[2]};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
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

const CartSummary = ({ isCheckoutPage = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const shipping = totalAmount > 0 ? (totalAmount > 1000 ? 0 : 100) : 0;
  const finalTotal = totalAmount + shipping - discount;
  
  const handleApplyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toUpperCase() === 'DISCOUNT20') {
      const discountAmount = Math.round(totalAmount * 0.2);
      setDiscount(discountAmount);
      dispatch(showNotification({
        status: 'success',
        title: 'Promo Code Applied',
        message: `You got a discount of Rs. ${discountAmount}`,
      }));
    } else {
      dispatch(showNotification({
        status: 'error',
        title: 'Invalid Promo Code',
        message: 'The promo code you entered is invalid or expired.',
      }));
    }
    setPromoCode('');
  };
  
  const handleCheckout = () => {
    if (isCheckoutPage) {
      // Process order
      dispatch(clearCart());
      navigate('/order-confirmation');
      dispatch(showNotification({
        status: 'success',
        title: 'Order Placed',
        message: 'Your order has been placed successfully!',
      }));
    } else {
      navigate('/checkout');
    }
  };
  
  return (
    <SummaryContainer>
      <SummaryTitle>Order Summary</SummaryTitle>
      
      <SummaryRow>
        <SummaryLabel>Items ({itemCount})</SummaryLabel>
        <SummaryValue>Rs. {totalAmount}</SummaryValue>
      </SummaryRow>
      
      <SummaryRow>
        <SummaryLabel>Shipping</SummaryLabel>
        <SummaryValue>
          {shipping === 0 ? 'Free' : `Rs. ${shipping}`}
        </SummaryValue>
      </SummaryRow>
      
      {discount > 0 && (
        <SummaryRow>
          <SummaryLabel>Discount</SummaryLabel>
          <SummaryValue bold>- Rs. {discount}</SummaryValue>
        </SummaryRow>
      )}
      
      <TotalRow>
        <span>Total</span>
        <span>Rs. {finalTotal}</span>
      </TotalRow>
      
      {!isCheckoutPage && (
        <PromoCodeContainer>
          <PromoCodeInput
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <ApplyButton onClick={handleApplyPromoCode}>
            Apply
          </ApplyButton>
        </PromoCodeContainer>
      )}
      
      <CheckoutButton 
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        {isCheckoutPage ? 'Place Order' : 'Proceed to Checkout'}
      </CheckoutButton>
    </SummaryContainer>
  );
};

export default CartSummary;
