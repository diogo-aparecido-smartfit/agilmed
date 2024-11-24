import { Theme } from "@/config/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-grow: 1;
  padding: 20px 16px;
  flex-direction: column;
`;

export const HeadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Theme.colors.lightDescription};
  margin: 20px 0;
`;

export const DoctorInfoWrapper = styled.View`
  flex-direction: column;
  margin-left: 10px;
  margin-right: 18px;
`;

export const DistanceContainer = styled.View`
  gap: 8px;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;
