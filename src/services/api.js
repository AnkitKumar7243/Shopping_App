import axios from 'axios';

const API_BASE_URL = 'https://5d76bf96515d1a0014085cf9.mockapi.io';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/product');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },
};

// Orders API
export const ordersAPI = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await api.get('/order');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/order', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
};

// Mock Auth API (since the original API doesn't have auth endpoints)
export const authAPI = {
  // Mock login
  login: async (credentials) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (credentials.email && credentials.password) {
      // Return mock user data
      return {
        id: 'user1',
        name: 'Demo User',
        email: credentials.email,
        token: 'mock-jwt-token',
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // Mock register
  register: async (userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (userData.name && userData.email && userData.password) {
      // Return mock user data
      return {
        id: 'user1',
        name: userData.name,
        email: userData.email,
        token: 'mock-jwt-token',
      };
    } else {
      throw new Error('Invalid user data');
    }
  },
};

export default api;
