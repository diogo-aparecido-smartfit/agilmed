import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Theme.colors.white};
`;

export const ContentContainer = styled.ScrollView`
  padding: 40px 24px;
  flex-direction: column;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 32px 0;
  padding: 32px 12px;
`;

export const ForgetPassword = styled.TouchableOpacity`
  margin-left: auto;
  margin-bottom: 32px;
`;
