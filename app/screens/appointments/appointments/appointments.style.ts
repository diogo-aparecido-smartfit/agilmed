import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.white};
`;

export const ContentContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
})`
  flex-direction: column;
`;

export const AppointmentList = styled.View`
  width: 100%;
  padding: 40px 24px;
  flex-direction: column;
  flex: 1;
  gap: 24px;
`;
