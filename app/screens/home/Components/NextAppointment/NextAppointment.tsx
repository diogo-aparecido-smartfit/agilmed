import Avatar from "@/components/Avatar/Avatar";
import * as S from "./style";
import { Calendar, Clock } from "iconsax-react-native";
import { useCallback } from "react";
import { router } from "expo-router";

interface NextAppointmentProps {
  doctorName: string;
  doctorType: string;
  date: string;
  startAt: string;
  endAt: string;
}

const NextAppointment = ({
  date,
  doctorName,
  doctorType,
  endAt,
  startAt,
}: NextAppointmentProps) => {
  const handleNavigateToAppointment = useCallback(() => {
    router.push("/(appointment)/details/1")
  }, [])

  return (
    <S.Container onPress={handleNavigateToAppointment}>
      <S.PrimaryContentWrapper>
        <Avatar uri="https://loremflickr.com/320/240" />
        <S.DoctorInfoWrapper>
          <S.Title>{doctorName}</S.Title>
          <S.Subtitle>{doctorType}</S.Subtitle>
        </S.DoctorInfoWrapper>
      </S.PrimaryContentWrapper>
      <S.SecondaryContentWrapper>
        <S.AppointmentInfoWrapper>
          <Calendar size={12} color="#FFF" />
          <S.AppointmentInfoText>{date}</S.AppointmentInfoText>
        </S.AppointmentInfoWrapper>
        <S.AppointmentInfoWrapper>
          <Clock size={12} color="#FFF" />
          <S.AppointmentInfoText>
            {startAt} - {endAt}
          </S.AppointmentInfoText>
        </S.AppointmentInfoWrapper>
      </S.SecondaryContentWrapper>
    </S.Container>
  );
};

export default NextAppointment;
