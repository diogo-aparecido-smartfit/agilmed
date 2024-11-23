import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.ImageBackground.attrs({
  imageStyle: {
    width: "auto",
    height: "45%",
  },
})`
  flex: 1;
  background-color: ${Theme.colors.white};
`;

export const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 60%;
  padding: 40px 24px;
  bottom: 0;
  position: absolute;
  background-color: ${Theme.colors.white};
  flex-direction: column;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InformationContainer = styled.View`
  flex-direction: column;
`;

export const ReviewsContainer = styled.View`
  flex-direction: row;
  gap: 4px;
`;

export const DividerContainer = styled.View`
  flex-direction: row;
  gap: 4px;
  align-items: center;
  margin: 24px 0;
`;

export const Divider = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${Theme.colors.inputColor};
`;

export const DetailsContainer = styled.View``;
