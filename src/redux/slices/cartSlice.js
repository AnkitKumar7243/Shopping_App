import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      state.totalQuantity++;
      state.totalAmount = calculateTotalAmount(state.items);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
      }));
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
      
      state.totalQuantity--;
      state.totalAmount = calculateTotalAmount(state.items);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
      }));
    },
    
    removeItemCompletely: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      state.totalQuantity -= existingItem.quantity;
      state.items = state.items.filter(item => item.id !== id);
      state.totalAmount = calculateTotalAmount(state.items);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
      }));
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      // Clear localStorage
      localStorage.removeItem('cart');
    },
    
    loadCart: (state, action) => {
      const cart = action.payload;
      state.items = cart.items || [];
      state.totalQuantity = cart.totalQuantity || 0;
      state.totalAmount = cart.totalAmount || 0;
    },
  },
});

// Helper function to calculate total amount
const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.totalPrice, 0);
};

export const { 
  addToCart, 
  removeFromCart, 
  removeItemCompletely, 
  clearCart, 
  loadCart 
} = cartSlice.actions;

export default cartSlice.reducer;
