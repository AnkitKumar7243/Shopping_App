import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleDarkMode } from '../../redux/slices/uiSlice';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 60px;
  height: 28px;
  outline: none;

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50px;
    height: 24px;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: all 0.3s linear;
  
  svg {
    width: 16px;
    height: 16px;
    transition: all 0.3s linear;
    
    &:first-child {
      transform: ${({ isDarkMode }) => isDarkMode ? 'translateY(100px)' : 'translateY(0)'};
    }
    
    &:nth-child(2) {
      transform: ${({ isDarkMode }) => isDarkMode ? 'translateY(0)' : 'translateY(-100px)'};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 14px;
      height: 14px;
    }
  }
`;

const ToggleButton = styled.span`
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  height: 22px;
  width: 22px;
  transform: ${({ isDarkMode }) => isDarkMode ? 'translateX(32px)' : 'translateX(0)'};
  transition: transform 0.3s linear;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 18px;
    width: 18px;
    transform: ${({ isDarkMode }) => isDarkMode ? 'translateX(28px)' : 'translateX(0)'};
  }
`;

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.ui);
  
  return (
    <ToggleContainer onClick={() => dispatch(toggleDarkMode())}>
      <Icons isDarkMode={darkMode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </Icons>
      <ToggleButton isDarkMode={darkMode} />
    </ToggleContainer>
  );
};

export default ThemeToggle;
