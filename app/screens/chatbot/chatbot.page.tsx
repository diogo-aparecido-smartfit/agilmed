import Lottie from 'lottie-react-native'
import { ArrowLeft, Cpu, Send2 } from 'iconsax-react-native'
import * as S from './chatbot.style'
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { Theme } from '@/config/theme'
import { router } from 'expo-router'
import Avatar from '@/components/Avatar/Avatar'
import Text from '@/components/Text/Text'
import MessageBubble from './Components/MessageBubble/MessageBubble'
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
        waitingResponse,
        lottieRef,
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
                            Amélia
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
                    <Lottie
                        ref={lottieRef}
                        source={require('@/assets/lottie/ghost-animation.json')}
                        autoPlay
                        loop={true}
                        style={{ width: 200, height: 200, marginBottom: 20 }}
                        resizeMode="cover"
                    />
                    <Text fontSize="xs" color="description" fontWeight="500">
                        Digite uma mensagem para iniciar a conversa
                    </Text>
                </S.EmptyContainer>
            ) : (
                <S.ChatContainer>
                    <FlatList
                        onContentSizeChange={() =>
                            scrollViewRef.current?.scrollToEnd({
                                animated: true,
                            })
                        }
                        ref={scrollViewRef}
                        data={messages}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <S.MessageContainer key={item.id}>
                                <MessageBubble
                                    isReceived={item.role !== 'user'}
                                >
                                    {item.content}
                                </MessageBubble>
                            </S.MessageContainer>
                        )}
                        keyExtractor={(item) => item.id}
                        ListFooterComponent={() =>
                            waitingResponse ? (
                                <MessageBubble isLoading isReceived={true} />
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
                        <Microphone2
                            size={24}
                            color={Theme.colors.inputColor}
                        />
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
