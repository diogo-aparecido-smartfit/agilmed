import * as S from "@/screens/schedule/schedule.style";
import { useNavigation } from "expo-router";

export default function SchedulePage() {
  const navigation = useNavigation();
  return (
    <S.Container>
      <S.Title>Tela de agendamentos</S.Title>
      <S.Button onPress={() => navigation.goBack()}>
        <S.ButtonText>Voltar</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}
