import "styled-components";
import Theme from "../config/theme";

type ThemeType = typeof Theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
