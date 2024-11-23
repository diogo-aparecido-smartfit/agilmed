import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Theme.colors.white};
`;

export const ContentContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
})`
  flex-direction: column;
`;

export const ButtonWrapper = styled.View`
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
  gap: 8px;
`;

export const AvatarContainer = styled.View``;

export const PersonalInfo = styled.View`
  margin-top: 18px;
  align-items: center;
  gap: 8px;
`;

export const FormContainer = styled.View`
  width: 100%;
  margin: 32px 0;
  gap: 20px;
`;
