import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProducts, setFilters } from '../redux/slices/productSlice';
import ProductFilter from '../components/product/ProductFilter';
import ProductGrid from '../components/product/ProductGrid';
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

const ResultCount = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
`;

const ProductsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: ${({ theme }) => theme.space[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FilterSidebar = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: 1;
  }
`;

const ProductsContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: 2;
  }
`;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, filteredProducts, loading, error } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  useEffect(() => {
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    
    if (category) {
      dispatch(setFilters({ category }));
    }
  }, [location.search, dispatch]);
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>All Products</PageTitle>
        <ResultCount>
          {loading 
            ? 'Loading products...' 
            : `Showing ${filteredProducts.length} of ${products.length} products`
          }
        </ResultCount>
      </PageHeader>
      
      <ProductsLayout>
        <FilterSidebar>
          <ProductFilter />
        </FilterSidebar>
        
        <ProductsContainer>
          <ProductGrid 
            products={filteredProducts} 
            loading={loading} 
            error={error} 
          />
        </ProductsContainer>
      </ProductsLayout>
      
      <AuthModal />
    </PageContainer>
  );
};

export default ProductsPage;
