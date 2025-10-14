import { Platform } from "react-native";
import { nativeTheme } from "./native";
import { webTheme } from "./web";

export const theme = Platform.OS === "web" ? webTheme : nativeTheme;

export { webTheme, nativeTheme };
