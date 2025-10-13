import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-outfit), sans-serif;
    background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  }
  `;
