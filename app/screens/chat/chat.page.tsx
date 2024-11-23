import Text from "@/components/Text/Text";
import * as S from "./chat.style";
import { Message } from "iconsax-react-native";
import { Theme } from "@/config/theme";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ChatPage() {
  return (
    <S.Container>
      <StatusBar style="dark" />
      <S.ContentContainer>
        <Text color="white" fontSize="4xl" fontWeight="700">
          AgilMed Healthcare
        </Text>
        <S.NavigationButton>
          <Text
            style={{ alignItems: "center" }}
            color="lightDescription"
            fontSize="base"
            fontWeight="400"
          >
            Agende suas próximas consultas online
          </Text>
        </S.NavigationButton>
        <S.ScheduleButton onPress={() => router.push("/(chat)/chat")}>
          <S.ScheduleTextWrapper>
            <Text color="white" fontWeight="700">
              Que tal marcar uma consulta?
            </Text>
            <Text color="lightDescription" fontWeight="400" fontSize="sm">
              O nosso assistente pode te ajudar
            </Text>
          </S.ScheduleTextWrapper>
          <S.ChatButton>
            <Message color={Theme.colors.black} />
          </S.ChatButton>
        </S.ScheduleButton>
      </S.ContentContainer>
    </S.Container>
  );
}
