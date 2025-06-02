import React from 'react'
import Text from '@/components/Text/Text'
import * as S from './chat.style'
import { Message } from 'iconsax-react-native'
import { useChatlistController } from './chat-list.controller'
import Lottie from 'lottie-react-native'
import AnimatedPagination from '@/components/AnimatedPagination/animated-pagination'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function ChatPage() {
    const theme = useTheme()
    const { darkMode } = useSelector((state: RootState) => state.settings)

    const {
        handleStartConversation,
        animationRef,
        scrollViewRef,
        activeIndex,
        handleScroll,
        CARD_WIDTH,
        features,
    } = useChatlistController()

    return (
        <S.Container>
            <S.ContentContainer>
                <S.HeaderSection>
                    <S.AvatarContainer>
                        <Lottie
                            ref={animationRef}
                            source={require('@/assets/lottie/bot-animation.json')}
                            style={{ width: 120, height: 120 }}
                            autoPlay={true}
                            loop={true}
                            speed={0.8}
                            resizeMode="cover"
                        />
                    </S.AvatarContainer>
                    <Text
                        color="title"
                        fontSize="3xl"
                        fontWeight="700"
                        textAlign="center"
                    >
                        Conheça a Amélia
                    </Text>
                    <Text
                        color="description"
                        fontSize="base"
                        fontWeight="400"
                        textAlign="center"
                        style={{ marginTop: 8 }}
                    >
                        Sua assistente virtual para cuidados de saúde
                    </Text>
                </S.HeaderSection>

                <S.FeaturesSection>
                    <Text
                        color="white"
                        fontSize="lg"
                        fontWeight="600"
                        style={{ marginBottom: 16 }}
                    >
                        O que posso fazer por você:
                    </Text>

                    <S.ScrollContainer
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScroll}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            gap: 16,
                        }}
                        decelerationRate="fast"
                        snapToInterval={CARD_WIDTH + 16}
                        snapToAlignment="center"
                    >
                        {features.map((item) => (
                            <S.CarouselCard
                                key={item.id}
                                style={{ width: CARD_WIDTH }}
                            >
                                <S.FeatureIconContainer>
                                    <item.icon
                                        size={32}
                                        color={theme.colors.mainColor}
                                        variant="Bulk"
                                    />
                                </S.FeatureIconContainer>
                                <S.FeatureContent>
                                    <Text
                                        fontSize="lg"
                                        fontWeight="700"
                                        color={darkMode ? 'white' : 'black'}
                                        textAlign="center"
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        fontSize="sm"
                                        color="description"
                                        textAlign="center"
                                        style={{ marginTop: 8 }}
                                    >
                                        {item.description}
                                    </Text>
                                </S.FeatureContent>
                            </S.CarouselCard>
                        ))}
                    </S.ScrollContainer>

                    <S.CarouselPagination>
                        <AnimatedPagination
                            totalItems={features.length}
                            activeIndex={activeIndex}
                            dotActiveColor={theme.colors.white}
                            dotInactiveColor={theme.colors.inputBackground}
                        />
                    </S.CarouselPagination>
                </S.FeaturesSection>

                <S.StatusBadge>
                    <S.StatusDot />
                    <Text fontSize="xs" color="white">
                        Disponível 24h
                    </Text>
                </S.StatusBadge>

                <S.StartChatButton onPress={handleStartConversation}>
                    <Text color="title" fontWeight="700" fontSize="base">
                        Iniciar conversa
                    </Text>
                    <Message
                        size={20}
                        color={theme.colors.title}
                        variant="Bold"
                    />
                </S.StartChatButton>
            </S.ContentContainer>
        </S.Container>
    )
}
