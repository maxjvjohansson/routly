import { createGlobalStyle } from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

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

    /*** Works on common browsers ***/
    ::selection {
        background-color: ${theme.colors.teal};
        color: ${theme.colors.white};
    }

    /*** Mozilla based browsers ***/
    ::-moz-selection {
        background-color: ${theme.colors.teal};
        color: ${theme.colors.white};
    }

    /***For Other Browsers ***/
    ::-o-selection {
        background-color: ${theme.colors.teal};
        color: ${theme.colors.white};
    }

    ::-ms-selection {
        background-color: ${theme.colors.teal};
        color: ${theme.colors.white};
    }

    /*** For Webkit ***/
    ::-webkit-selection {
        background-color: ${theme.colors.teal};
        color: ${theme.colors.white};
    }
  }
`;
