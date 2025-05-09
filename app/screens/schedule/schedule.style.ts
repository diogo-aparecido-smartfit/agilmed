import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${Theme.colors.black};
  font-size: 24px;
  font-weight: 700;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonText = styled.Text``;
