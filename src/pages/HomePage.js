import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import AuthModal from '../components/auth/AuthModal';

const HeroSection = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-top: -2rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: ${({ theme }) => theme.space[4]};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
    color: white;
  }
`;

const SectionContainer = styled.section`
  padding: ${({ theme }) => theme.space[10]} 0;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[8]};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.space[3]};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space[6]};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};

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

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: ${({ theme }) => theme.space[8]};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CategorySection = styled.section`
  padding: ${({ theme }) => theme.space[10]} 0;
  background-color: ${({ theme }) => theme.colors.light};
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.space[6]};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 300px;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.space[4]};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
    transition: background-color 0.3s ease;
  }

  &:hover::before {
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 250px;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const CategoryContent = styled.div`
  position: absolute;
  z-index: 2;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: ${({ theme }) => theme.space[4]};
`;

const CategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  transition: transform 0.3s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Memoize product filtering to avoid unnecessary recalculations
  // Only compute these when products array changes
  const getFilteredProducts = () => {
    if (!products || products.length === 0) return {
      featuredProducts: [],
      menProducts: [],
      womenProducts: [],
      kidsProducts: [],
      accessories: [],
      trendingProducts: []
    };

    // Get featured products (first 12 products)
    const featuredProducts = products.slice(0, 12);

    // Get products for different categories - show at least 10 products per section
    const menProducts = products.filter(product => !product.isAccessory && product.id % 3 === 0).slice(0, 12);
    const womenProducts = products.filter(product => !product.isAccessory && product.id % 3 === 1).slice(0, 12);
    const kidsProducts = products.filter(product => !product.isAccessory && product.id % 3 === 2).slice(0, 12);
    const accessories = products.filter(product => product.isAccessory).slice(0, 12);
    const trendingProducts = products.filter(product => product.price > 1000).slice(0, 12);

    return {
      featuredProducts,
      menProducts,
      womenProducts,
      kidsProducts,
      accessories,
      trendingProducts
    };
  };

  // Get all filtered products at once
  const {
    featuredProducts,
    menProducts,
    womenProducts,
    kidsProducts,
    accessories,
    trendingProducts
  } = getFilteredProducts();

  // Get products for specific subcategories - more efficient version
  const getSubcategoryProducts = (filterFn, count = 10) => {
    if (!products || products.length === 0) return [];

    const filtered = products.filter(filterFn);
    if (filtered.length >= count) return filtered.slice(0, count);

    // If we don't have enough products, duplicate some to reach the desired count
    // This is more efficient than the previous implementation
    const result = [...filtered];
    const numDuplicatesNeeded = count - result.length;

    if (numDuplicatesNeeded > 0 && filtered.length > 0) {
      // Create only the number of duplicates we need
      for (let i = 0; i < numDuplicatesNeeded; i++) {
        const sourceProduct = filtered[i % filtered.length];
        result.push({
          ...sourceProduct,
          id: `${sourceProduct.id}-dup-${i}`, // Create unique IDs for duplicates
        });
      }
    }

    return result;
  };

  const watches = getSubcategoryProducts(product => product.isAccessory && product.id % 4 === 0);
  const bags = getSubcategoryProducts(product => product.isAccessory && product.id % 4 === 1);
  const sunglasses = getSubcategoryProducts(product => product.isAccessory && product.id % 4 === 2);
  const jewelry = getSubcategoryProducts(product => product.isAccessory && product.id % 4 === 3);

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Elevate Your Style</HeroTitle>
          <HeroSubtitle>
            Discover the latest trends in fashion and accessories
          </HeroSubtitle>
          <HeroButton to="/products">Shop Now</HeroButton>
        </HeroContent>
      </HeroSection>

      <CategorySection>
        <SectionTitle>Shop by Category</SectionTitle>
        <CategoryGrid style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <CategoryCard to="/products?category=men">
            <CategoryImage src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Men" />
            <CategoryContent>
              <CategoryTitle>Men</CategoryTitle>
            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women">
            <CategoryImage src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Women" />
            <CategoryContent>
              <CategoryTitle>Women</CategoryTitle>
            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=kids">
            <CategoryImage src="https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Kids" />
            <CategoryContent>
              <CategoryTitle>Kids</CategoryTitle>
            </CategoryContent>
          </CategoryCard>
        </CategoryGrid>
      </CategorySection>

      <CategorySection>
        <SectionTitle>Shop by Product Type</SectionTitle>
        <CategoryGrid>
          {/* Topwear Category */}
          <CategoryCard to="/products?category=topwear">
            <CategoryImage src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Topwear" />
            <CategoryContent>
              <CategoryTitle>Topwear</CategoryTitle>
            </CategoryContent>
          </CategoryCard>

          {/* Bottomwear Category */}
          <CategoryCard to="/products?category=bottomwear">
            <CategoryImage src="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80" alt="Bottomwear" />
            <CategoryContent>
              <CategoryTitle>Bottomwear</CategoryTitle>
            </CategoryContent>
          </CategoryCard>

          {/* Footwear Category */}
          <CategoryCard to="/products?category=footwear">
            <CategoryImage src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" alt="Footwear" />
            <CategoryContent>
              <CategoryTitle>Footwear</CategoryTitle>
            </CategoryContent>
          </CategoryCard>

          {/* Accessories Category */}
          <CategoryCard to="/products?category=accessories">
            <CategoryImage src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Accessories" />
            <CategoryContent>
              <CategoryTitle>Accessories</CategoryTitle>
            </CategoryContent>
          </CategoryCard>
        </CategoryGrid>
      </CategorySection>

      {/* Detailed Topwear Categories */}
      <SectionContainer>
        <SectionTitle>Topwear Collections</SectionTitle>
        <CategoryGrid>
          <CategoryCard to="/products?category=men-tshirts">
            <CategoryImage src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" alt="T-Shirts" />
            <CategoryContent>
              <CategoryTitle>T-Shirts</CategoryTitle>
            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-shirts">
            <CategoryImage src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80" alt="Casual Shirts" />
            <CategoryContent>
              <CategoryTitle>Casual Shirts</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women-tops">
            <CategoryImage src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1405&q=80" alt="Women's Tops" />
            <CategoryContent>
              <CategoryTitle>Women's Tops</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women-dresses">
            <CategoryImage src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80" alt="Dresses" />
            <CategoryContent>
              <CategoryTitle>Dresses</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-sweatshirts">
            <CategoryImage src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" alt="Sweatshirts" />
            <CategoryContent>
              <CategoryTitle>Sweatshirts</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-jackets">
            <CategoryImage src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1436&q=80" alt="Jackets" />
            <CategoryContent>
              <CategoryTitle>Jackets</CategoryTitle>

            </CategoryContent>
          </CategoryCard>
        </CategoryGrid>
      </SectionContainer>

      {/* Detailed Bottomwear Categories */}
      <SectionContainer>
        <SectionTitle>Bottomwear Collections</SectionTitle>
        <CategoryGrid>
          <CategoryCard to="/products?category=men-jeans">
            <CategoryImage src="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80" alt="Jeans" />
            <CategoryContent>
              <CategoryTitle>Jeans</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-trousers">
            <CategoryImage src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" alt="Trousers" />
            <CategoryContent>
              <CategoryTitle>Trousers</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-shorts">
            <CategoryImage src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Shorts" />
            <CategoryContent>
              <CategoryTitle>Shorts</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women-jeans">
            <CategoryImage src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" alt="Women's Jeans" />
            <CategoryContent>
              <CategoryTitle>Women's Jeans</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women-skirts">
            <CategoryImage src="https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" alt="Skirts" />
            <CategoryContent>
              <CategoryTitle>Skirts</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-trackpants">
            <CategoryImage src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80" alt="Track Pants" />
            <CategoryContent>
              <CategoryTitle>Track Pants</CategoryTitle>

            </CategoryContent>
          </CategoryCard>
        </CategoryGrid>
      </SectionContainer>

      {/* Detailed Footwear Categories */}
      <SectionContainer>
        <SectionTitle>Footwear Collections</SectionTitle>
        <CategoryGrid>
          <CategoryCard to="/products?category=men-casual-shoes">
            <CategoryImage src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1598&q=80" alt="Casual Shoes" />
            <CategoryContent>
              <CategoryTitle>Casual Shoes</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-sports-shoes">
            <CategoryImage src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Sports Shoes" />
            <CategoryContent>
              <CategoryTitle>Sports Shoes</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-formal-shoes">
            <CategoryImage src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Formal Shoes" />
            <CategoryContent>
              <CategoryTitle>Formal Shoes</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women-heels">
            <CategoryImage src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" alt="Heels" />
            <CategoryContent>
              <CategoryTitle>Heels</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women-flats">
            <CategoryImage src="https://images.unsplash.com/photo-1491897554428-130a60dd4757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" alt="Flats" />
            <CategoryContent>
              <CategoryTitle>Flats</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-sandals">
            <CategoryImage src="https://images.unsplash.com/photo-1564605255974-2b8d964c0a39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Sandals" />
            <CategoryContent>
              <CategoryTitle>Sandals</CategoryTitle>

            </CategoryContent>
          </CategoryCard>
        </CategoryGrid>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Featured Products</SectionTitle>
        <ProductGrid>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </ProductGrid>
        <ViewAllLink to="/products">View All Products</ViewAllLink>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Trending Collections</SectionTitle>
        <ProductGrid>
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=trending">View All Trending</ViewAllLink>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Men's Fashion</SectionTitle>
        <ProductGrid>
          {menProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=men">View All Men's Fashion</ViewAllLink>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Women's Fashion</SectionTitle>
        <ProductGrid>
          {womenProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=women">View All Women's Fashion</ViewAllLink>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Kids' Fashion</SectionTitle>
        <ProductGrid>
          {kidsProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=kids">View All Kids' Fashion</ViewAllLink>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Popular Accessories</SectionTitle>
        <ProductGrid>
          {accessories.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=accessories">View All Accessories</ViewAllLink>
      </SectionContainer>

      {/* Detailed Accessories Categories */}
      <SectionContainer>
        <SectionTitle>Accessories Collections</SectionTitle>
        <CategoryGrid>
          <CategoryCard to="/products?category=men-watches">
            <CategoryImage src="https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80" alt="Watches" />
            <CategoryContent>
              <CategoryTitle>Watches</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women-jewellery">
            <CategoryImage src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" alt="Jewelry" />
            <CategoryContent>
              <CategoryTitle>Jewelry</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-bags">
            <CategoryImage src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" alt="Bags" />
            <CategoryContent>
              <CategoryTitle>Bags</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=women-bags">
            <CategoryImage src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Handbags" />
            <CategoryContent>
              <CategoryTitle>Handbags</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-sunglasses">
            <CategoryImage src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" alt="Sunglasses" />
            <CategoryContent>
              <CategoryTitle>Sunglasses</CategoryTitle>

            </CategoryContent>
          </CategoryCard>

          <CategoryCard to="/products?category=men-belts">
            <CategoryImage src="https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Belts" />
            <CategoryContent>
              <CategoryTitle>Belts</CategoryTitle>

            </CategoryContent>
          </CategoryCard>
        </CategoryGrid>
      </SectionContainer>

      {/* Accessory Product Sections */}
      <SectionContainer>
        <SectionTitle>Watches Collection</SectionTitle>
        <ProductGrid>
          {watches.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=men-watches">View All Watches</ViewAllLink>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Bags Collection</SectionTitle>
        <ProductGrid>
          {bags.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=men-bags">View All Bags</ViewAllLink>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Sunglasses Collection</SectionTitle>
        <ProductGrid>
          {sunglasses.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=men-sunglasses">View All Sunglasses</ViewAllLink>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Jewelry Collection</SectionTitle>
        <ProductGrid>
          {jewelry.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <ViewAllLink to="/products?category=women-jewellery">View All Jewelry</ViewAllLink>
      </SectionContainer>

      <AuthModal />
    </>
  );
};

export default HomePage;
