import Text from "@/components/Text/Text";
import * as S from "@/screens/appointments/appointmentDetails/appointment-details.style";
import Header from "./Components/Header/Header";
import { Location, Star1 } from "iconsax-react-native";
import { Theme } from "@/config/theme";
import { StatusBar } from "expo-status-bar";

export default function AppointmentDetailsPage() {
  return (
    <S.Container
      source={{
        uri: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
    >
      <StatusBar style="auto" />
      <Header />
      <S.ContentContainer>
        <S.Header>
          <S.InformationContainer>
            <Text fontWeight="700" fontSize="xl">
              Dr. Joseph Brostito
            </Text>
            <Text fontWeight="400" color="description">
              Dentista | Clínica Apollo
            </Text>
          </S.InformationContainer>
          <S.ReviewsContainer>
            <Text>4.8</Text>
            <Star1 variant="Bold" color={Theme.colors.yellow} />
          </S.ReviewsContainer>
        </S.Header>
        <S.DividerContainer>
          <S.Divider />
          <Location size={12} color={Theme.colors.inputColor} />
          <S.Divider />
        </S.DividerContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
