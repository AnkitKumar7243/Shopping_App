import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: true, // Default to dark mode
  showCart: false,
  showAuthModal: false,
  authModalMode: 'login', // 'login' or 'register'
  notification: null,
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', state.darkMode);
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    closeCart: (state) => {
      state.showCart = false;
    },
    toggleAuthModal: (state) => {
      state.showAuthModal = !state.showAuthModal;
    },
    openAuthModal: (state, action) => {
      state.showAuthModal = true;
      state.authModalMode = action.payload || 'login';
    },
    closeAuthModal: (state) => {
      state.showAuthModal = false;
    },
    setAuthModalMode: (state, action) => {
      state.authModalMode = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  toggleCart,
  closeCart,
  toggleAuthModal,
  openAuthModal,
  closeAuthModal,
  setAuthModalMode,
  showNotification,
  clearNotification,
  toggleMobileMenu,
  closeMobileMenu
} = uiSlice.actions;

export default uiSlice.reducer;
