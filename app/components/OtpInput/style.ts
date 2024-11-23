import { Theme } from "@/config/theme";
import { TextInput, View } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const InputBox = styled(TextInput)`
  width: 64px;
  height: 56px;
  border-width: 1px;
  background-color: ${Theme.colors.inputBackground};
  border-color: ${Theme.colors.borderColor};
  color: ${Theme.colors.mainColor};
  text-align: center;
  font-size: 18px;
  border-radius: 16px;
  font-size: 28px;
  font-family: ${Theme.fonts.semiBold};
`;
