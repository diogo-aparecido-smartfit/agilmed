import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  border-radius: 24px;
  padding: 10px 16px;
  background-color: ${Theme.colors.fillColor};
`;
