import "styled-components";
import { webTheme } from "./theme/web";

type WebTheme = typeof webTheme;

declare module "styled-components" {
  export interface DefaultTheme extends WebTheme {}
}
