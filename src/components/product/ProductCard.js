import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../../redux/slices/cartSlice';
import { showNotification } from '../../redux/slices/uiSlice';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.space[4]};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 180px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  right: ${({ theme }) => theme.space[3]};
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }
`;

const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Brand = styled.span`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

const Name = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space[2]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  
  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
`;

const AddToCartButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.base};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-grow: 1;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
  }
`;

const ViewDetailsButton = styled(Link)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.base};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

// Memoize the ProductCard component to prevent unnecessary re-renders
const ProductCard = React.memo(({ product }) => {
  const dispatch = useDispatch();
  
  // Memoize the handleAddToCart function so it doesn't get recreated on every render
  const handleAddToCart = React.useCallback(() => {
    if (!product) return;
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      preview: product.preview,
      brand: product.brand,
    }));
    
    dispatch(showNotification({
      status: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart.`,
    }));
  }, [dispatch, product]);
  
  // Handle null or undefined product
  if (!product) {
    return null;
  }
  
  return (
    <Card>
      <ImageContainer>
        <ProductImage 
          src={product.preview || 'https://via.placeholder.com/300'} 
          alt={product.name || 'Product'} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />
        <WishlistButton>
          <i className="far fa-heart"></i>
        </WishlistButton>
      </ImageContainer>
      
      <ProductInfo>
        <Brand>{product.brand || 'Brand'}</Brand>
        <Name>
          <Link to={`/products/${product.id}`}>{product.name || 'Product Name'}</Link>
        </Name>
        <Price>Rs. {product.price || 0}</Price>
        
        <ButtonContainer>
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
          <ViewDetailsButton to={`/products/${product.id}`}>
            Details
          </ViewDetailsButton>
        </ButtonContainer>
      </ProductInfo>
    </Card>
  );
});

export default ProductCard;
