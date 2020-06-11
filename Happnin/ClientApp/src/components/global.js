import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  

  body {
    background: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  .card {
    background: ${({ theme }) => theme.card}; 
    transition: all 0.25s linear;
  }

 pre #text {
  background-color: ${({ theme }) => theme.homeDetails} !important;
 }
  `
