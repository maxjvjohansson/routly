import "styled-components";
import { nativeTheme } from "./theme/native";

type NativeTheme = typeof nativeTheme;

declare module "styled-components" {
  export interface DefaultTheme extends NativeTheme {}
}
