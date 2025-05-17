import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addToCart, removeFromCart, removeItemCompletely } from '../../redux/slices/cartSlice';

const CartItemContainer = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.space[3]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.space[3]};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radii.base};
  }
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

const ItemBrand = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

const ItemPrice = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Quantity = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: ${({ theme }) => theme.space[2]};
  
  &:hover {
    text-decoration: underline;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.space[3]};
  
  p {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleIncreaseQuantity = () => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      preview: item.preview,
      brand: item.brand,
    }));
  };
  
  const handleDecreaseQuantity = () => {
    dispatch(removeFromCart(item.id));
  };
  
  const handleRemoveItem = () => {
    dispatch(removeItemCompletely(item.id));
  };
  
  return (
    <CartItemContainer>
      <ImageContainer>
        <img src={item.preview} alt={item.name} />
      </ImageContainer>
      
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemBrand>{item.brand}</ItemBrand>
        <ItemPrice>Rs. {item.price}</ItemPrice>
        
        <QuantityControls>
          <QuantityButton onClick={handleDecreaseQuantity}>-</QuantityButton>
          <Quantity>{item.quantity}</Quantity>
          <QuantityButton onClick={handleIncreaseQuantity}>+</QuantityButton>
          <RemoveButton onClick={handleRemoveItem}>Remove</RemoveButton>
        </QuantityControls>
      </ItemDetails>
      
      <TotalPrice>
        <p>Rs. {item.totalPrice}</p>
      </TotalPrice>
    </CartItemContainer>
  );
};

export default CartItem;
