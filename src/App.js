import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import GlobalStyle from './styles/GlobalStyle';
import lightTheme, { darkTheme } from './styles/theme';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Notification from './components/ui/Notification';
import CartSidebar from './components/cart/CartSidebar';
import AuthModal from './components/auth/AuthModal';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { darkMode, notification, showCart, showAuthModal } = useSelector((state) => state.ui);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />

        {notification && <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />}

        {showCart && <CartSidebar />}
        {showAuthModal && <AuthModal />}
      </Router>
    </ThemeProvider>
  );
}

export default App;
