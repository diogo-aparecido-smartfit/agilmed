import * as S from "@/screens/home/home.style";
import { useCallback } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { router } from "expo-router";
import NextAppointment from "./Components/NextAppointment/NextAppointment";
import { Calendar1, Hospital, Link2, Sun } from "iconsax-react-native";
import FastAction from "./Components/FastAction/FastAction";
import NearDoctor from "./Components/NearDoctor/NearDoctor";
import Text from "@/components/Text/Text";
import { StatusBar } from "expo-status-bar";
import { getFirstAndLastName } from "@/utils/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

export default function HomePage() {
  const { user } = useSelector((state: RootState) => state.auth);

  const handleNavigateToProfile = useCallback(() => {
    router.navigate("/(home)/(settings)/settings");
  }, []);

  return (
    <S.Container>
      <StatusBar style="dark" />
      <S.ContentContainer>
        <S.Header>
          <S.WelcomeWrapper>
            <S.Title>Olá</S.Title>
            <S.Username>
              {getFirstAndLastName(user?.full_name ?? "")}
            </S.Username>
          </S.WelcomeWrapper>
          <Avatar
            uri={user?.profile_picture_url ?? undefined}
            onPress={handleNavigateToProfile}
          />
        </S.Header>
        <S.NextAppointmentsContainer>
          <Text fontWeight="600">Agendamentos futuros 🚀</Text>
          <S.NextAppointmentsWrapper>
            <NextAppointment
              date="Domingo, 12 Julho"
              doctorName="Dr. Fulano Ciclano"
              doctorType="Clínico Geral"
              endAt="12:00"
              startAt="11:00"
              key="1"
            />
            <NextAppointment
              date="Domingo, 12 Julho"
              doctorName="Dr. Fulano Ciclano"
              doctorType="Clínico Geral"
              endAt="12:00"
              startAt="11:00"
              key="2"
            />
          </S.NextAppointmentsWrapper>
        </S.NextAppointmentsContainer>
        <S.FastActionContainer>
          <FastAction
            onPress={() =>
              showMessage({
                message: "Desculpe, mas esta ação ainda não foi implementada.",
                type: "warning",
              })
            }
            Icon={Sun}
            text="Covid 19"
          />
          <FastAction
            onPress={() => router.push("/(home)/(appointments)/appointments")}
            Icon={Calendar1}
            text="Consultas"
          />
          <FastAction
            onPress={() =>
              showMessage({
                message: "Desculpe, mas esta ação ainda não foi implementada.",
                type: "warning",
              })
            }
            Icon={Link2}
            text="Remédios"
          />
          <FastAction
            onPress={() =>
              showMessage({
                message: "Desculpe, mas esta ação ainda não foi implementada.",
                type: "warning",
              })
            }
            Icon={Hospital}
            text="Unidades"
          />
        </S.FastActionContainer>
        <S.NearDoctorsContainer>
          <Text fontWeight="600">Unidades médicas próximas de você 📍</Text>
          {/* <Text fontSize="sm" color="description">
            Clique na unidade desejada para mais detalhes
          </Text> */}
          <NearDoctor
            name="Hospital Santa Maria"
            type="Ortopédico"
            distance="1.2 km"
            openAt="08:00"
            rating="4,2 (120 reviews)"
          />
          <NearDoctor
            name="Hospital Santa Maria"
            type="Ortopédico"
            distance="1.2 km"
            openAt="08:00"
            rating="4,2 (120 reviews)"
          />
          <NearDoctor
            name="Hospital Santa Maria"
            type="Ortopédico"
            distance="1.2 km"
            openAt="08:00"
            rating="4,2 (120 reviews)"
          />
          <NearDoctor
            name="Hospital Santa Maria"
            type="Ortopédico"
            distance="1.2 km"
            openAt="08:00"
            rating="4,2 (120 reviews)"
          />
          <NearDoctor
            name="Hospital Santa Maria"
            type="Ortopédico"
            distance="1.2 km"
            openAt="08:00"
            rating="4,2 (120 reviews)"
          />
        </S.NearDoctorsContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
