import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: ${({ theme }) => theme.lineHeights.base};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  button {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.body};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.shorter};
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    list-style: none;
  }

  main {
    min-height: calc(100vh - 160px);
    padding: ${({ theme }) => theme.space[8]} 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.space[4]};
  }

  .btn {
    display: inline-block;
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
    border-radius: ${({ theme }) => theme.radii.base};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-align: center;
    transition: all 0.3s ease;
    border: none;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .btn-primary {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.dark};
    }
  }

  .btn-secondary {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.dark};
    }
  }

  .btn-accent {
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.dark};
    }
  }

  .btn-outline {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;

export default GlobalStyle;
