import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { showNotification } from '../redux/slices/uiSlice';
import AuthModal from '../components/auth/AuthModal';
import ProductCard from '../components/product/ProductCard';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const Breadcrumbs = styled.div`
  margin-bottom: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  a {
    color: ${({ theme }) => theme.colors.lightText};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  span {
    margin: 0 ${({ theme }) => theme.space[2]};
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space[8]};
  margin-bottom: ${({ theme }) => theme.space[10]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  flex-wrap: wrap;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
  border: 2px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Brand = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const ProductName = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const Description = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.space[2]};
  }
  
  p {
    line-height: ${({ theme }) => theme.lineHeights.tall};
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[4]};
  
  button {
    width: 40px;
    height: 40px;
    border-radius: ${({ theme }) => theme.radii.base};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: transparent;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    cursor: pointer;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.light};
    }
  }
  
  span {
    width: 60px;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const AddToCartButton = styled.button`
  flex: 2;
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
`;

const WishlistButton = styled.button`
  flex: 1;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.base};
  padding: ${({ theme }) => theme.space[3]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const RelatedProductsSection = styled.section`
  margin-top: ${({ theme }) => theme.space[10]};
  margin-bottom: ${({ theme }) => theme.space[10]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space[6]};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.space[2]};
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, products, loading, error } = useSelector((state) => state.products);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    dispatch(fetchProductById(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);
  
  useEffect(() => {
    if (currentProduct) {
      setActiveImage(0);
    }
  }, [currentProduct]);
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (currentProduct) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          preview: currentProduct.preview,
          brand: currentProduct.brand,
        }));
      }
      
      dispatch(showNotification({
        status: 'success',
        title: 'Added to Cart',
        message: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart.`,
      }));
    }
  };
  
  // Get related products (same category, excluding current product)
  const relatedProducts = currentProduct 
    ? products
        .filter(product => 
          product.isAccessory === currentProduct.isAccessory && 
          product.id !== currentProduct.id
        )
        .slice(0, 4)
    : [];
  
  if (loading) {
    return (
      <PageContainer>
        <p>Loading product details...</p>
      </PageContainer>
    );
  }
  
  if (error) {
    return (
      <PageContainer>
        <p>Error: {error}</p>
      </PageContainer>
    );
  }
  
  if (!currentProduct) {
    return (
      <PageContainer>
        <p>Product not found</p>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Breadcrumbs>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${currentProduct.isAccessory ? 'accessories' : 'clothing'}`}>
          {currentProduct.isAccessory ? 'Accessories' : 'Clothing'}
        </Link>
        <span>/</span>
        <span>{currentProduct.name}</span>
      </Breadcrumbs>
      
      <ProductContainer>
        <ImageSection>
          <MainImage 
            src={currentProduct.photos[activeImage] || currentProduct.preview} 
            alt={currentProduct.name} 
          />
          
          <ThumbnailContainer>
            {currentProduct.photos.map((photo, index) => (
              <Thumbnail 
                key={index}
                src={photo}
                alt={`${currentProduct.name} - ${index + 1}`}
                active={index === activeImage}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </ThumbnailContainer>
        </ImageSection>
        
        <ProductInfo>
          <Brand>{currentProduct.brand}</Brand>
          <ProductName>{currentProduct.name}</ProductName>
          <Price>Rs. {currentProduct.price}</Price>
          
          <Description>
            <h3>Description</h3>
            <p>{currentProduct.description}</p>
          </Description>
          
          <QuantitySelector>
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </QuantitySelector>
          
          <ButtonContainer>
            <AddToCartButton onClick={handleAddToCart}>
              Add to Cart
            </AddToCartButton>
            <WishlistButton>
              <i className="far fa-heart"></i> Wishlist
            </WishlistButton>
          </ButtonContainer>
        </ProductInfo>
      </ProductContainer>
      
      <RelatedProductsSection>
        <SectionTitle>Related Products</SectionTitle>
        <RelatedProductsGrid>
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </RelatedProductsGrid>
      </RelatedProductsSection>
      
      <AuthModal />
    </PageContainer>
  );
};

export default ProductDetailPage;
