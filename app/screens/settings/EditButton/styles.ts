import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background-color: ${Theme.colors.mainColor};
  position: absolute;
  bottom: 0;
  right: 0;
`;
