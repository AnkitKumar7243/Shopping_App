import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Load cart from localStorage if available
import { loadCart } from './redux/slices/cartSlice';
import { loadUser } from './redux/slices/authSlice';
import { setDarkMode } from './redux/slices/uiSlice';

// Check for saved cart in localStorage
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  store.dispatch(loadCart(JSON.parse(savedCart)));
}

// Check for saved user in localStorage
const savedUser = localStorage.getItem('user');
if (savedUser) {
  store.dispatch(loadUser(JSON.parse(savedUser)));
}

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode) {
  store.dispatch(setDarkMode(savedDarkMode === 'true'));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
