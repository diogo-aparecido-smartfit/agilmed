import Text from "@/components/Text/Text";
import * as S from "@/screens/appointment/appointmentDetails/appointment-details.style";
import Header from "./Components/Header/Header";
import { Calendar1, Clock, Location, Note, Star1 } from "iconsax-react-native";
import { Theme } from "@/config/theme";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import { UseAppointmentDetailsController } from "./appointment-details.controller";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function AppointmentDetailsPage() {
  const { handleOpenOnMaps, mapRef, region, bottomSheetRef, snapPoints } =
    UseAppointmentDetailsController();

  return (
    <S.Container
      source={{
        uri: "https://images.unsplash.com/photo-1631507623104-aa66944677aa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
    >
      <Header />
      <BottomSheet
        backgroundStyle={{ borderRadius: 32 }}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
      >
        <BottomSheetView>
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
              <Note size={12} color={Theme.colors.inputColor} />
              <S.Divider />
            </S.DividerContainer>
            <S.Content>
              <Text fontWeight="500" fontSize="lg">
                Detalhes do agendamento
              </Text>
              <S.ReviewsContainer>
                <Calendar1 size={16} color={Theme.colors.description} />
                <Text color="description">Quarta-Feira, 14 de Outubro</Text>
              </S.ReviewsContainer>
              <S.ReviewsContainer>
                <Clock size={16} color={Theme.colors.description} />
                <Text color="description">14:00</Text>
              </S.ReviewsContainer>
              <S.AddressContainer>
                <Text fontWeight="500" fontSize="lg">
                  Endereço da Clínica
                </Text>
                <Text color="description">
                  Av. Afonso Pena, 1177 - Centro, Uberlândia - MG, 38400-706
                </Text>
                <S.CustomMap
                  onPress={handleOpenOnMaps}
                  ref={mapRef}
                  initialRegion={region}
                >
                  <Marker title="Clínica Apollo" coordinate={region} />
                </S.CustomMap>
              </S.AddressContainer>
            </S.Content>
          </S.ContentContainer>
        </BottomSheetView>
      </BottomSheet>
    </S.Container>
  );
}
