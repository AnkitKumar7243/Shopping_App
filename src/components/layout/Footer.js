import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.footerBg};
  color: white;
  padding: ${({ theme }) => theme.space[8]} 0 ${({ theme }) => theme.space[4]};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    text-transform: uppercase;
    margin-bottom: ${({ theme }) => theme.space[4]};
    letter-spacing: 1px;
  }

  p {
    margin-bottom: ${({ theme }) => theme.space[2]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    text-transform: capitalize;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[6]};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: ${({ theme }) => theme.fontSizes.xs};

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[3]};

  a {
    color: white;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Online Store</h3>
          <p><Link to="/products?category=clothing">Men Clothing</Link></p>
          <p><Link to="/products?category=clothing">Women Clothing</Link></p>
          <p><Link to="/products?category=accessories">Men Accessories</Link></p>
          <p><Link to="/products?category=accessories">Women Accessories</Link></p>
        </FooterSection>

        <FooterSection>
          <h3>Helpful Links</h3>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/about">About</Link></p>
          <p><Link to="/contact">Contact</Link></p>
          <p><Link to="/faq">FAQ</Link></p>
        </FooterSection>

        <FooterSection>
          <h3>Partners</h3>
          <p>Zara</p>
          <p>Pantaloons</p>
          <p>Levis</p>
          <p>UCB</p>
          <p>+ Many More</p>
        </FooterSection>

        <FooterSection>
          <h3>Address</h3>
          <p>Building 101</p>
          <p>Central Avenue</p>
          <p>LA - 902722</p>
          <p>United States</p>

          <SocialIcons>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest"></i>
            </a>
          </SocialIcons>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          &copy; {new Date().getFullYear()} Thread. All rights reserved. | Designed with ❤️ by <a href="https://github.com/AnkitKumar7243/Shopping-app" target="_blank" rel="noopener noreferrer">Ankit Kumar</a>
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
