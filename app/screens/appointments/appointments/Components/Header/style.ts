import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    width: "auto",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
  },
  horizontal: true,
  scrollEnabled: true,
  alwaysBounceHorizontal: true,
  showsHorizontalScrollIndicator: false,
})``;
