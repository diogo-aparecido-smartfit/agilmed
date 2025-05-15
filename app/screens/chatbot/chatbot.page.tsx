import { ArrowLeft, Cpu, Microphone2, Send2 } from 'iconsax-react-native'
import * as S from './chatbot.style'
import {
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    View,
} from 'react-native'
import { Theme } from '@/config/theme'
import { router } from 'expo-router'
import Avatar from '@/components/Avatar/Avatar'
import Text from '@/components/Text/Text'
import MessageBubble from './Components/MessageBubble/MessageBubble'
import OptionBubble from './Components/OptionBubble/OptionBubble'
import useChatbotController from './chatbot.controller'
import { StatusBar } from 'expo-status-bar'

export default function ChatBotPage() {
    const {
        today,
        onSendMessage,
        handleSelectOption,
        setMessage,
        message,
        scrollViewRef,
        loading,
        userId,
        messages,
        loadingMessages,
    } = useChatbotController()

    const hasMessages = messages.length > 0

    return (
        <S.Container behavior="padding">
            <StatusBar style="auto" />
            <S.HeaderContainer>
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={24} color={Theme.colors.black} />
                </TouchableOpacity>
                <S.BotInfoContainer>
                    <Avatar uri={Cpu} size={44} />
                    <S.BotInfoWrapper>
                        <Text fontSize="sm" fontWeight="700">
                            Jordan
                        </Text>
                        <S.StatusWrapper>
                            <S.ActivePointer />
                            <Text
                                fontSize="xs"
                                color="description"
                                fontWeight="500"
                            >
                                Ativo
                            </Text>
                        </S.StatusWrapper>
                    </S.BotInfoWrapper>
                </S.BotInfoContainer>
            </S.HeaderContainer>
            {!hasMessages ? (
                <S.EmptyContainer>
                    <Text fontSize="4xl" color="mainColor" fontWeight="700">
                        AgilMed
                    </Text>
                    <Text fontSize="xs" color="description" fontWeight="500">
                        Digite uma mensagem para iniciar a conversa
                    </Text>
                </S.EmptyContainer>
            ) : (
                <S.ChatContainer
                    contentContainerStyle={{
                        flex: 1,
                        padding: 24,
                        gap: 16,
                    }}
                    onContentSizeChange={() =>
                        scrollViewRef.current?.scrollToEnd({ animated: true })
                    }
                    ref={scrollViewRef}
                >
                    <FlatList
                        data={messages}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <S.MessageContainer key={item.id}>
                                <MessageBubble
                                    isReceived={
                                        item.userId !== userId?.toString()
                                    }
                                >
                                    {item.payload.text}
                                </MessageBubble>
                                {item.payload.options && (
                                    <S.OptionsRow
                                        horizontal={true}
                                        contentContainerStyle={{
                                            alignItems: 'center',
                                            paddingHorizontal: 24,
                                            gap: 8,
                                        }}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {item.payload.options.map(
                                            (option, index) => (
                                                <OptionBubble
                                                    onPress={() =>
                                                        handleSelectOption(
                                                            option.label
                                                        )
                                                    }
                                                    key={index}
                                                >
                                                    {option.label}
                                                </OptionBubble>
                                            )
                                        )}
                                    </S.OptionsRow>
                                )}
                            </S.MessageContainer>
                        )}
                        keyExtractor={(item) => item.id}
                        ListFooterComponent={() =>
                            loadingMessages ? (
                                <MessageBubble isLoading isReceived={true}>
                                    Carregando...
                                </MessageBubble>
                            ) : null
                        }
                    />
                </S.ChatContainer>
            )}
            <S.FooterContainer>
                <S.TextInputWrapper>
                    <S.TextInput
                        placeholderTextColor={Theme.colors.inputColor}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Digite uma mensagem..."
                        multiline={true}
                    />
                    {/* <S.MicrophoneButton>
                        <Microphone2 color={Theme.colors.inputColor} />
                    </S.MicrophoneButton> */}
                </S.TextInputWrapper>
                <S.SendMessageButton disabled={loading} onPress={onSendMessage}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Send2 size={16} color="#FFF" />
                    )}
                </S.SendMessageButton>
            </S.FooterContainer>
        </S.Container>
    )
}
