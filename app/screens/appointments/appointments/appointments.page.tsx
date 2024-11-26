import * as S from "@/screens/appointments/appointments/appointments.style";
import NextAppointments from "./Components/NextAppointments/NextAppointments";
import Header from "./Components/Header/Header";

export default function AppointmentsPage() {
  return (
    <S.Container>
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
