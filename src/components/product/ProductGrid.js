import React, { useMemo } from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space[8]};
  grid-column: 1 / -1;

  h3 {
    margin-bottom: ${({ theme }) => theme.space[4]};
    color: ${({ theme }) => theme.colors.lightText};
  }

  p {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

// Memoize the ProductGrid component to prevent unnecessary re-renders
const ProductGrid = React.memo(({ products, loading, error }) => {
  // Memoize the skeleton loading state
  const loadingGrid = useMemo(() => (
    <Grid>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-price"></div>
          </div>
        </div>
      ))}
    </Grid>
  ), []);

  // Memoize the error message
  const errorMessage = useMemo(() => (
    <EmptyMessage>
      <h3>Error Loading Products</h3>
      <p>{error}</p>
    </EmptyMessage>
  ), [error]);

  // Memoize the empty message
  const emptyMessage = useMemo(() => (
    <EmptyMessage>
      <h3>No Products Found</h3>
      <p>Try adjusting your filters or search criteria.</p>
    </EmptyMessage>
  ), []);

  // Memoize the product cards to prevent unnecessary re-renders
  const productCards = useMemo(() => {
    if (!products || products.length === 0) return null;

    return (
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    );
  }, [products]);

  // Return the appropriate component based on the state
  if (loading) return loadingGrid;
  if (error) return errorMessage;
  if (!products || products.length === 0) return emptyMessage;
  return productCards;
});

export default ProductGrid;
