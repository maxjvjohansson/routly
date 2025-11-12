import { baseTheme } from "./base";

export const nativeTheme = {
  ...baseTheme,
  spacing: {
    xxs: 8,
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  typography: {
    fontRegular: "Outfit_400Regular",
    fontMedium: "Outfit_500Medium",
    fontSemiBold: "Outfit_600SemiBold",
    fontBold: "Outfit_700Bold",
    xxs: 12,
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
    "2xl": 32,
    "3xl": 48,
  },
} as const;
