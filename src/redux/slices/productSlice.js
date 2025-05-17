import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Add cache control headers to prevent browser caching
      const response = await axios.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      // Add a small delay to prevent UI jank during loading
      await new Promise(resolve => setTimeout(resolve, 100));

      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue, getState }) => {
    try {
      // Check if we already have the product in the state
      const { products } = getState().products;
      const existingProduct = products.find(product => product.id === id);

      // If we already have the product, return it immediately
      if (existingProduct) {
        return existingProduct;
      }

      // Otherwise, fetch it from the API
      const response = await axios.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 10000],
    searchQuery: '',
    sortBy: 'default',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredProducts = state.products;
    },
    sortProducts: (state, action) => {
      state.filters.sortBy = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    searchProducts: (state, action) => {
      state.filters.searchQuery = action.payload;
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = applyFilters(action.payload, state.filters);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Helper function to apply filters
const applyFilters = (products, filters) => {
  let result = [...products];

  // Filter by category
  if (filters.category !== 'all') {
    // Handle main gender categories
    if (filters.category === 'men' || filters.category === 'women' || filters.category === 'kids') {
      // For now, we'll just simulate this with the existing data
      // In a real app, products would have gender attributes
      if (filters.category === 'men') {
        // Simulate men's products (first half of non-accessories)
        result = result.filter(product => !product.isAccessory && product.id % 3 === 0);
      } else if (filters.category === 'women') {
        // Simulate women's products (second half of non-accessories)
        result = result.filter(product => !product.isAccessory && product.id % 3 === 1);
      } else if (filters.category === 'kids') {
        // Simulate kids' products (remaining non-accessories)
        result = result.filter(product => !product.isAccessory && product.id % 3 === 2);
      }
    }
    // Handle specific subcategories
    else if (filters.category.includes('-')) {
      const [gender, type] = filters.category.split('-');

      // Simulate filtering by both gender and type
      if (gender === 'men') {
        result = result.filter(product => product.id % 3 === 0);
      } else if (gender === 'women') {
        result = result.filter(product => product.id % 3 === 1);
      } else if (gender === 'kids' || gender === 'boys' || gender === 'girls') {
        result = result.filter(product => product.id % 3 === 2);
      }

      // Further filter by type
      if (type.includes('shirt') || type.includes('top')) {
        // Topwear
        result = result.filter(product => !product.isAccessory && product.id % 2 === 0);
      } else if (type.includes('jean') || type.includes('trouser') || type.includes('short')) {
        // Bottomwear
        result = result.filter(product => !product.isAccessory && product.id % 2 === 1);
      } else if (type.includes('shoe') || type.includes('sandal') || type.includes('flat') || type.includes('heel')) {
        // Footwear - simulate with some accessories
        result = result.filter(product => product.isAccessory && product.id % 2 === 0);
      } else if (type.includes('watch') || type.includes('bag') || type.includes('sunglass') || type.includes('jewellery') || type === 'accessories') {
        // Accessories
        result = result.filter(product => product.isAccessory);
      }
    }
    // Handle legacy categories
    else if (filters.category === 'clothing') {
      result = result.filter(product => !product.isAccessory);
    } else if (filters.category === 'accessories') {
      result = result.filter(product => product.isAccessory);
    } else if (filters.category === 'trending') {
      // Simulate trending products (products with price > 1000)
      result = result.filter(product => product.price > 1000);
    } else if (filters.category === 'topwear') {
      result = result.filter(product => !product.isAccessory && product.id % 2 === 0);
    } else if (filters.category === 'bottomwear') {
      result = result.filter(product => !product.isAccessory && product.id % 2 === 1);
    } else if (filters.category === 'footwear') {
      result = result.filter(product => product.isAccessory && product.id % 2 === 0);
    }
  }

  // Filter by price range
  result = result.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
  );

  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );
  }

  // Sort products
  switch (filters.sortBy) {
    case 'price-low-high':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name-a-z':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-z-a':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      // Default sorting (by id)
      result.sort((a, b) => a.id - b.id);
  }

  return result;
};

export const { setFilters, clearFilters, sortProducts, searchProducts } = productSlice.actions;

export default productSlice.reducer;
