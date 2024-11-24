import Text from "@/components/Text/Text";
import * as S from "./chat.style";
import { Message } from "iconsax-react-native";
import { Theme } from "@/config/theme";
import { StatusBar } from "expo-status-bar";
import { useChatlistController } from "./chat-list.controller";
import { ActivityIndicator } from "react-native";

export default function ChatPage() {
  const { handleCreateConversation, loading } = useChatlistController();

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
        <S.ScheduleButton disabled={loading} onPress={handleCreateConversation}>
          <S.ScheduleTextWrapper>
            <Text color="white" fontWeight="700">
              Que tal marcar uma consulta?
            </Text>
            <Text color="lightDescription" fontWeight="400" fontSize="sm">
              Clique aqui e inicie uma nova conversa
            </Text>
          </S.ScheduleTextWrapper>
          <S.ChatButton>
            {loading ? (
              <ActivityIndicator color={Theme.colors.black} />
            ) : (
              <Message color={Theme.colors.black} />
            )}
          </S.ChatButton>
        </S.ScheduleButton>
      </S.ContentContainer>
    </S.Container>
  );
}
