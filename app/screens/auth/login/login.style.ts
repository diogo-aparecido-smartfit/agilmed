import { Theme } from "@/config/theme";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  background-color: ${Theme.colors.white};
  flex: 1;
`;

export const ContentContainer = styled(ScrollView)`
  padding: 40px 24px;
  flex-direction: column;
`;

export const FormContainer = styled.View`
  flex-grow: 1;
  margin: 32px 0;
  padding: 32px 12px;
`;

export const RegisterButton = styled(TouchableOpacity)`
  margin-top: 32px;
`;
