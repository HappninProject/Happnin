import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    h1, h2, h3, h4, h5 : ${({ theme }) => theme.otherText};
    transition: all 0.25s linear;
  }

  .card {
    background: ${({ theme }) => theme.card}; 
    transition: all 0.25s linear;
  }
  `
