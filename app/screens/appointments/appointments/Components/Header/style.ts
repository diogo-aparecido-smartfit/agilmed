import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: 12,
    paddingHorizontal: 24,
  },
  horizontal: true,
  scrollEnabled: true,
  showsHorizontalScrollIndicator: false,
})``;
