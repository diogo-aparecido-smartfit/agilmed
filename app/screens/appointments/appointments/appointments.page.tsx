import * as S from "@/screens/appointments/appointments/appointments.style";
import NextAppointments from "./Components/NextAppointments/NextAppointments";
import Header from "./Components/Header/Header";
import { StatusBar } from "expo-status-bar";

export default function AppointmentsPage() {
  return (
    <S.Container>
      <StatusBar style="dark" />
      <S.ContentContainer>
        <Header />
        <S.AppointmentList>
          <NextAppointments />
          <NextAppointments />
          <NextAppointments />
          <NextAppointments />
          <NextAppointments />
          <NextAppointments />
          <NextAppointments />
        </S.AppointmentList>
      </S.ContentContainer>
    </S.Container>
  );
}
