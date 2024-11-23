import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity<{
  width?: number;
  height?: number;
}>`
  width: ${({ width }): string => (width ? `${width}px` : "56px")};
  height: ${({ height }): string => (height ? `${height}px` : "56px")};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 999px;
`;

export const IconBackground = styled.View`
  background-color: ${Theme.colors.fillColor};
  border-radius: 999px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image``;
