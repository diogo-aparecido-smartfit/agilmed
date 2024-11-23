import { Theme } from "@/config/theme";
import { TouchableOpacity, View, Text, FlatList, Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${Theme.colors.white};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: 24,
    flexDirection: "column",
    paddingBottom: 40,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 50 : 90,
  },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 32px;
`;

export const WelcomeWrapper = styled.View`
  flex-direction: column;
  gap: 6px;
`;

export const Username = styled(Text)`
  color: ${Theme.colors.title};
  font-family: ${Theme.fonts.bold};
  font-size: 20px;
  line-height: 24px;
`;

export const Title = styled.Text`
  color: ${Theme.colors.description};
  font-family: ${Theme.fonts.regular};
  font-size: 16px;
  line-height: 18px;
`;

export const Description = styled(Text)`
  color: ${Theme.colors.title};
  font-family: ${Theme.fonts.regular};
  font-size: 16px;
`;

export const UsersList = styled(FlatList)`
  flex-grow: 1;
`;

export const UsersListContainer = styled(View)`
  flex: 1;
`;

export const UserContainer = styled(View)`
  flex-direction: column;
  margin: 8px 0;
`;

export const AlertButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.mainColor};
  padding: 12px 10px;
  border-radius: 8px;
`;

export const AlertButtonText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

export const NextAppointmentsContainer = styled.View`
  flex-direction: column;
  gap: 16px;
`;

export const NextAppointmentsWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: 16,
    flexDirection: "row",
    paddingHorizontal: 24,
    overflow: "visible",
  },
  horizontal: true,
  scrollEnabled: true,
  showsHorizontalScrollIndicator: false,
})`
  margin: 0 -24px;
`;

export const FastActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`;

export const NearDoctorsContainer = styled.View`
  margin-top: 24px;
  flex-direction: column;
  gap: 16px;
`;

export const NearDoctorsList = styled.View`
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
