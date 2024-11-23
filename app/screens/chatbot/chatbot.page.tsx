import { ArrowLeft, Cpu, Microphone2, Send2 } from "iconsax-react-native";
import * as S from "./chatbot.style";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Theme } from "@/config/theme";
import { router } from "expo-router";
import Avatar from "@/components/Avatar/Avatar";
import Text from "@/components/Text/Text";
import MessageBubble from "./Components/MessageBubble/MessageBubble";
import OptionBubble from "./Components/OptionBubble/OptionBubble";
import useChatbotController from "./chatbot.controller";
import { StatusBar } from "expo-status-bar";

export default function ChatBotPage() {
  const {
    today,
    onSendMessage,
    chatState,
    handleSelectOption,
    setMessage,
    message,
    scrollViewRef,
  } = useChatbotController("1234");

  return (
    <S.Container>
      <StatusBar style="auto" />
      <S.HeaderContainer>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={Theme.colors.black} />
        </TouchableOpacity>
        <S.BotInfoContainer>
          <Avatar uri={Cpu} size={44} />
          <S.BotInfoWrapper>
            <Text fontSize="sm" fontWeight="700">
              AgilMed
            </Text>
            <S.StatusWrapper>
              <S.ActivePointer />
              <Text fontSize="xs" color="description" fontWeight="500">
                Ativo
              </Text>
            </S.StatusWrapper>
          </S.BotInfoWrapper>
        </S.BotInfoContainer>
      </S.HeaderContainer>
      <S.ChatContainer
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
        ref={scrollViewRef}
      >
        <Text textAlign="center" fontWeight="500" color="description">
          {today}
        </Text>
        <FlatList
          data={chatState.chatHistory}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          style={{ marginBottom: 16 }}
          renderItem={({ item }) => (
            <S.MessageContainer>
              <MessageBubble isReceived={item.isReceived}>
                {item.text}
              </MessageBubble>
              {item.options && (
                <S.OptionsRow>
                  {item.options.map((item, index) => (
                    <OptionBubble
                      onPress={() => handleSelectOption(item)}
                      key={index}
                    >
                      {item}
                    </OptionBubble>
                  ))}
                </S.OptionsRow>
              )}
            </S.MessageContainer>
          )}
          keyExtractor={(item) => item.id}
        />
        {chatState.isLoading && (
          <MessageBubble isLoading isReceived>
            carregando
          </MessageBubble>
        )}
      </S.ChatContainer>
      <S.FooterContainer>
        <S.TextInputWrapper>
          <S.TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Digite uma mensagem..."
          />
          <S.MicrophoneButton>
            <Microphone2 color={Theme.colors.inputColor} />
          </S.MicrophoneButton>
        </S.TextInputWrapper>
        <S.SendMessageButton onPress={onSendMessage}>
          <Send2 color="#FFF" />
        </S.SendMessageButton>
      </S.FooterContainer>
    </S.Container>
  );
}
