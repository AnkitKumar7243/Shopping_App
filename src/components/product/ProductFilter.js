import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setFilters, clearFilters, sortProducts } from '../../redux/slices/productSlice';

const FilterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[4]};

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.space[4]};

  h4 {
    margin-bottom: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const CategoryOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

const CategoryButton = styled.button`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) =>
    active ? 'white' : theme.colors.text};
  border: 1px solid ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.border};
  }
`;

const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

const PriceInputs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
`;

const PriceInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RangeSlider = styled.input`
  width: 100%;
  margin: ${({ theme }) => theme.space[2]} 0;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

const SortSelect = styled.select`
  padding: ${({ theme }) => theme.space[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space[4]};
`;

const ClearButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radii.base};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

const ProductFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);

  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }));
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(e.target.value);
    setPriceRange(newPriceRange);
  };

  const handlePriceRangeApply = () => {
    dispatch(setFilters({ priceRange }));
  };

  const handleSortChange = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setPriceRange([0, 10000]);
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <h3>Filters</h3>
        <SortContainer>
          <label htmlFor="sort">Sort by:</label>
          <SortSelect
            id="sort"
            value={filters.sortBy}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
          </SortSelect>
        </SortContainer>
      </FilterHeader>

      <FilterSection>
        <h4>Gender</h4>
        <CategoryOptions>
          <CategoryButton
            active={filters.category === 'all'}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </CategoryButton>
          <CategoryButton
            active={filters.category && filters.category.startsWith('men')}
            onClick={() => handleCategoryChange('men')}
          >
            Men
          </CategoryButton>
          <CategoryButton
            active={filters.category && filters.category.startsWith('women')}
            onClick={() => handleCategoryChange('women')}
          >
            Women
          </CategoryButton>
          <CategoryButton
            active={filters.category && (filters.category.startsWith('kids') ||
                                        filters.category.startsWith('boys') ||
                                        filters.category.startsWith('girls'))}
            onClick={() => handleCategoryChange('kids')}
          >
            Kids
          </CategoryButton>
        </CategoryOptions>
      </FilterSection>

      <FilterSection>
        <h4>Category</h4>
        <CategoryOptions>
          <CategoryButton
            active={filters.category === 'trending'}
            onClick={() => handleCategoryChange('trending')}
          >
            Trending
          </CategoryButton>
          <CategoryButton
            active={filters.category && filters.category.includes('tshirts') ||
                   filters.category && filters.category.includes('shirts') ||
                   filters.category && filters.category.includes('tops')}
            onClick={() => handleCategoryChange(filters.category && filters.category.startsWith('men') ? 'men-tshirts' :
                                              filters.category && filters.category.startsWith('women') ? 'women-tops' : 'clothing')}
          >
            Topwear
          </CategoryButton>
          <CategoryButton
            active={filters.category && filters.category.includes('jeans') ||
                   filters.category && filters.category.includes('trousers') ||
                   filters.category && filters.category.includes('shorts')}
            onClick={() => handleCategoryChange(filters.category && filters.category.startsWith('men') ? 'men-jeans' :
                                              filters.category && filters.category.startsWith('women') ? 'women-jeans' : 'bottomwear')}
          >
            Bottomwear
          </CategoryButton>
          <CategoryButton
            active={filters.category && filters.category.includes('shoes') ||
                   filters.category && filters.category.includes('sandals') ||
                   filters.category && filters.category.includes('flats') ||
                   filters.category && filters.category.includes('heels')}
            onClick={() => handleCategoryChange(filters.category && filters.category.startsWith('men') ? 'men-casual-shoes' :
                                              filters.category && filters.category.startsWith('women') ? 'women-flats' : 'footwear')}
          >
            Footwear
          </CategoryButton>
          <CategoryButton
            active={filters.category && filters.category.includes('watches') ||
                   filters.category && filters.category.includes('bags') ||
                   filters.category && filters.category.includes('sunglasses') ||
                   filters.category && filters.category.includes('jewellery') ||
                   filters.category && filters.category.includes('accessories')}
            onClick={() => handleCategoryChange(filters.category && filters.category.startsWith('men') ? 'men-watches' :
                                              filters.category && filters.category.startsWith('women') ? 'women-jewellery' : 'accessories')}
          >
            Accessories
          </CategoryButton>
        </CategoryOptions>
      </FilterSection>

      <FilterSection>
        <h4>Price Range</h4>
        <PriceRange>
          <RangeSlider
            type="range"
            min="0"
            max="10000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            onMouseUp={handlePriceRangeApply}
            onTouchEnd={handlePriceRangeApply}
          />
          <PriceInputs>
            <PriceInput
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              onBlur={handlePriceRangeApply}
            />
            <PriceInput
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              onBlur={handlePriceRangeApply}
            />
          </PriceInputs>
        </PriceRange>
      </FilterSection>

      <ButtonContainer>
        <ClearButton onClick={handleClearFilters}>
          Clear All Filters
        </ClearButton>
      </ButtonContainer>
    </FilterContainer>
  );
};

export default ProductFilter;
