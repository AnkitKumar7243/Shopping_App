import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  toggleCart,
  openAuthModal,
  toggleMobileMenu,
  closeMobileMenu
} from '../../redux/slices/uiSlice';
import { logout } from '../../redux/slices/authSlice';
import { searchProducts } from '../../redux/slices/productSlice';
import ThemeToggle from '../ui/ThemeToggle';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.headerBg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  padding: ${({ theme }) => theme.space[3]} 0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.headerBg};
    flex-direction: column;
    padding: ${({ theme }) => theme.space[4]};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: ${({ theme }) => theme.zIndices.dropdown};
    max-height: 80vh;
    overflow-y: auto;
  }
`;

const NavLink = styled(Link)`
  margin: 0 ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.space[2]} 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover > div {
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DropdownToggle = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};

  i {
    margin-left: ${({ theme }) => theme.space[1]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.base};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[2]};
  z-index: ${({ theme }) => theme.zIndices.dropdown};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    box-shadow: none;
    width: 100%;
    margin-left: ${({ theme }) => theme.space[4]};
    padding: 0;
  }
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radii.base};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[2]} 0;
  }
`;

const MegaMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[4]};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  border-radius: ${({ theme }) => theme.radii.base};

  ${NavItem}:hover & {
    display: flex;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    box-shadow: none;
    padding: ${({ theme }) => theme.space[2]};
  }
`;

const MegaMenuColumn = styled.div`
  flex: 1;
  padding: 0 ${({ theme }) => theme.space[3]};

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[2]} 0;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin: 0 ${({ theme }) => theme.space[4]};
  flex-grow: 1;
  max-width: 400px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    margin: ${({ theme }) => theme.space[3]} 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.space[2]};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.lightText};
  cursor: pointer;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-left: ${({ theme }) => theme.space[3]};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  i {
    font-size: 1.25rem;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(50%, -50%);
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { totalQuantity } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { darkMode, mobileMenuOpen } = useSelector((state) => state.ui);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        dispatch(closeMobileMenu());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen, dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
      navigate('/products');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // State for mobile dropdowns
  const [openDropdowns, setOpenDropdowns] = useState({
    men: false,
    women: false,
    kids: false
  });

  const toggleDropdown = (dropdown) => {
    if (window.innerWidth <= 768) {
      setOpenDropdowns(prev => ({
        ...prev,
        [dropdown]: !prev[dropdown]
      }));
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <b>THREAD</b>
        </Logo>

        <MobileMenuButton onClick={() => dispatch(toggleMobileMenu())}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>

        <Nav isOpen={mobileMenuOpen}>
          {/* Men's Category */}
          <NavItem>
            <DropdownToggle onClick={() => toggleDropdown('men')}>
              Men <i className="fas fa-chevron-down"></i>
            </DropdownToggle>
            <MegaMenu isOpen={openDropdowns.men}>
              <MegaMenuColumn>
                <h4>Topwear</h4>
                <DropdownLink to="/products?category=men-tshirts" onClick={() => dispatch(closeMobileMenu())}>
                  T-Shirts
                </DropdownLink>
                <DropdownLink to="/products?category=men-shirts" onClick={() => dispatch(closeMobileMenu())}>
                  Casual Shirts
                </DropdownLink>
                <DropdownLink to="/products?category=men-formal-shirts" onClick={() => dispatch(closeMobileMenu())}>
                  Formal Shirts
                </DropdownLink>
                <DropdownLink to="/products?category=men-sweatshirts" onClick={() => dispatch(closeMobileMenu())}>
                  Sweatshirts
                </DropdownLink>
                <DropdownLink to="/products?category=men-jackets" onClick={() => dispatch(closeMobileMenu())}>
                  Jackets
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Bottomwear</h4>
                <DropdownLink to="/products?category=men-jeans" onClick={() => dispatch(closeMobileMenu())}>
                  Jeans
                </DropdownLink>
                <DropdownLink to="/products?category=men-trousers" onClick={() => dispatch(closeMobileMenu())}>
                  Casual Trousers
                </DropdownLink>
                <DropdownLink to="/products?category=men-formal-trousers" onClick={() => dispatch(closeMobileMenu())}>
                  Formal Trousers
                </DropdownLink>
                <DropdownLink to="/products?category=men-shorts" onClick={() => dispatch(closeMobileMenu())}>
                  Shorts
                </DropdownLink>
                <DropdownLink to="/products?category=men-trackpants" onClick={() => dispatch(closeMobileMenu())}>
                  Track Pants
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Footwear</h4>
                <DropdownLink to="/products?category=men-casual-shoes" onClick={() => dispatch(closeMobileMenu())}>
                  Casual Shoes
                </DropdownLink>
                <DropdownLink to="/products?category=men-sports-shoes" onClick={() => dispatch(closeMobileMenu())}>
                  Sports Shoes
                </DropdownLink>
                <DropdownLink to="/products?category=men-formal-shoes" onClick={() => dispatch(closeMobileMenu())}>
                  Formal Shoes
                </DropdownLink>
                <DropdownLink to="/products?category=men-sneakers" onClick={() => dispatch(closeMobileMenu())}>
                  Sneakers
                </DropdownLink>
                <DropdownLink to="/products?category=men-sandals" onClick={() => dispatch(closeMobileMenu())}>
                  Sandals & Floaters
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Accessories</h4>
                <DropdownLink to="/products?category=men-watches" onClick={() => dispatch(closeMobileMenu())}>
                  Watches
                </DropdownLink>
                <DropdownLink to="/products?category=men-belts" onClick={() => dispatch(closeMobileMenu())}>
                  Belts
                </DropdownLink>
                <DropdownLink to="/products?category=men-wallets" onClick={() => dispatch(closeMobileMenu())}>
                  Wallets
                </DropdownLink>
                <DropdownLink to="/products?category=men-sunglasses" onClick={() => dispatch(closeMobileMenu())}>
                  Sunglasses
                </DropdownLink>
                <DropdownLink to="/products?category=men-bags" onClick={() => dispatch(closeMobileMenu())}>
                  Bags
                </DropdownLink>
              </MegaMenuColumn>
            </MegaMenu>
          </NavItem>

          {/* Women's Category */}
          <NavItem>
            <DropdownToggle onClick={() => toggleDropdown('women')}>
              Women <i className="fas fa-chevron-down"></i>
            </DropdownToggle>
            <MegaMenu isOpen={openDropdowns.women}>
              <MegaMenuColumn>
                <h4>Ethnic Wear</h4>
                <DropdownLink to="/products?category=women-kurtas" onClick={() => dispatch(closeMobileMenu())}>
                  Kurtas & Suits
                </DropdownLink>
                <DropdownLink to="/products?category=women-sarees" onClick={() => dispatch(closeMobileMenu())}>
                  Sarees
                </DropdownLink>
                <DropdownLink to="/products?category=women-ethnic-dresses" onClick={() => dispatch(closeMobileMenu())}>
                  Ethnic Dresses
                </DropdownLink>
                <DropdownLink to="/products?category=women-ethnic-bottoms" onClick={() => dispatch(closeMobileMenu())}>
                  Ethnic Bottoms
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Western Wear</h4>
                <DropdownLink to="/products?category=women-tops" onClick={() => dispatch(closeMobileMenu())}>
                  Tops
                </DropdownLink>
                <DropdownLink to="/products?category=women-dresses" onClick={() => dispatch(closeMobileMenu())}>
                  Dresses
                </DropdownLink>
                <DropdownLink to="/products?category=women-jeans" onClick={() => dispatch(closeMobileMenu())}>
                  Jeans
                </DropdownLink>
                <DropdownLink to="/products?category=women-shirts" onClick={() => dispatch(closeMobileMenu())}>
                  Shirts
                </DropdownLink>
                <DropdownLink to="/products?category=women-trousers" onClick={() => dispatch(closeMobileMenu())}>
                  Trousers
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Footwear</h4>
                <DropdownLink to="/products?category=women-flats" onClick={() => dispatch(closeMobileMenu())}>
                  Flats
                </DropdownLink>
                <DropdownLink to="/products?category=women-heels" onClick={() => dispatch(closeMobileMenu())}>
                  Heels
                </DropdownLink>
                <DropdownLink to="/products?category=women-boots" onClick={() => dispatch(closeMobileMenu())}>
                  Boots
                </DropdownLink>
                <DropdownLink to="/products?category=women-sports-shoes" onClick={() => dispatch(closeMobileMenu())}>
                  Sports Shoes
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Accessories</h4>
                <DropdownLink to="/products?category=women-jewellery" onClick={() => dispatch(closeMobileMenu())}>
                  Jewellery
                </DropdownLink>
                <DropdownLink to="/products?category=women-watches" onClick={() => dispatch(closeMobileMenu())}>
                  Watches
                </DropdownLink>
                <DropdownLink to="/products?category=women-bags" onClick={() => dispatch(closeMobileMenu())}>
                  Handbags
                </DropdownLink>
                <DropdownLink to="/products?category=women-sunglasses" onClick={() => dispatch(closeMobileMenu())}>
                  Sunglasses
                </DropdownLink>
              </MegaMenuColumn>
            </MegaMenu>
          </NavItem>

          {/* Kids Category */}
          <NavItem>
            <DropdownToggle onClick={() => toggleDropdown('kids')}>
              Kids <i className="fas fa-chevron-down"></i>
            </DropdownToggle>
            <MegaMenu isOpen={openDropdowns.kids}>
              <MegaMenuColumn>
                <h4>Boys Clothing</h4>
                <DropdownLink to="/products?category=boys-tshirts" onClick={() => dispatch(closeMobileMenu())}>
                  T-Shirts
                </DropdownLink>
                <DropdownLink to="/products?category=boys-shirts" onClick={() => dispatch(closeMobileMenu())}>
                  Shirts
                </DropdownLink>
                <DropdownLink to="/products?category=boys-jeans" onClick={() => dispatch(closeMobileMenu())}>
                  Jeans
                </DropdownLink>
                <DropdownLink to="/products?category=boys-shorts" onClick={() => dispatch(closeMobileMenu())}>
                  Shorts
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Girls Clothing</h4>
                <DropdownLink to="/products?category=girls-dresses" onClick={() => dispatch(closeMobileMenu())}>
                  Dresses
                </DropdownLink>
                <DropdownLink to="/products?category=girls-tops" onClick={() => dispatch(closeMobileMenu())}>
                  Tops
                </DropdownLink>
                <DropdownLink to="/products?category=girls-jeans" onClick={() => dispatch(closeMobileMenu())}>
                  Jeans
                </DropdownLink>
                <DropdownLink to="/products?category=girls-skirts" onClick={() => dispatch(closeMobileMenu())}>
                  Skirts
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Footwear</h4>
                <DropdownLink to="/products?category=kids-casual-shoes" onClick={() => dispatch(closeMobileMenu())}>
                  Casual Shoes
                </DropdownLink>
                <DropdownLink to="/products?category=kids-sports-shoes" onClick={() => dispatch(closeMobileMenu())}>
                  Sports Shoes
                </DropdownLink>
                <DropdownLink to="/products?category=kids-sandals" onClick={() => dispatch(closeMobileMenu())}>
                  Sandals
                </DropdownLink>
                <DropdownLink to="/products?category=kids-school-shoes" onClick={() => dispatch(closeMobileMenu())}>
                  School Shoes
                </DropdownLink>
              </MegaMenuColumn>

              <MegaMenuColumn>
                <h4>Accessories</h4>
                <DropdownLink to="/products?category=kids-watches" onClick={() => dispatch(closeMobileMenu())}>
                  Watches
                </DropdownLink>
                <DropdownLink to="/products?category=kids-bags" onClick={() => dispatch(closeMobileMenu())}>
                  Bags & Backpacks
                </DropdownLink>
                <DropdownLink to="/products?category=kids-sunglasses" onClick={() => dispatch(closeMobileMenu())}>
                  Sunglasses
                </DropdownLink>
                <DropdownLink to="/products?category=kids-accessories" onClick={() => dispatch(closeMobileMenu())}>
                  Other Accessories
                </DropdownLink>
              </MegaMenuColumn>
            </MegaMenu>
          </NavItem>

          {/* Trendy Collections Link */}
          <NavLink to="/products?category=trending" onClick={() => dispatch(closeMobileMenu())}>
            Trendy Collections
          </NavLink>

          <SearchContainer>
            <form onSubmit={handleSearchSubmit}>
              <SearchInput
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton type="submit">
                <i className="fas fa-search"></i>
              </SearchButton>
            </form>
          </SearchContainer>
        </Nav>

        <IconsContainer>
          <div style={{ marginRight: '10px' }}>
            <ThemeToggle />
          </div>

          <IconButton onClick={() => dispatch(toggleCart())} title="Cart">
            <i className="fas fa-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
            {totalQuantity > 0 && <CartBadge>{totalQuantity}</CartBadge>}
          </IconButton>

          {isAuthenticated ? (
            <IconButton onClick={handleLogout} title="Logout">
              <i className="fas fa-user-circle" style={{ fontSize: '1.5rem' }}></i>
            </IconButton>
          ) : (
            <IconButton onClick={() => dispatch(openAuthModal('login'))} title="Login">
              <i className="fas fa-user-circle" style={{ fontSize: '1.5rem' }}></i>
            </IconButton>
          )}
        </IconsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
