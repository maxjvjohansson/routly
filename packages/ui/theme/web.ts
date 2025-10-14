import { baseTheme } from "./base";

export const webTheme = {
  ...baseTheme,
  spacing: {
    xxs: "0.5rem", // 8px
    xs: "0.75rem", // 12px
    sm: "1rem", // 16px
    md: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "3rem", // 48px
    xxl: "4rem", // 64px
  },

  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "50%",
  },

  typography: {
    xs: "0.75rem",
    sm: "1rem",
    md: "1.125rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
  },

  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  media: {
    sm: "@media (min-width: 480px)",
    md: "@media (min-width: 768px)",
    lg: "@media (min-width: 1024px)",
    xl: "@media (min-width: 1280px)",
  },
} as const;
