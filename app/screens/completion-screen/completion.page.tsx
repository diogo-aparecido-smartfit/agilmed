import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Text from '@/components/Text/Text'
import Lottie from 'lottie-react-native'
import { router } from 'expo-router'
import * as S from './completion.style'

export default function CompletionScreen() {
    const confettiRef = useRef<Lottie>(null)
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        if (confettiRef.current) {
            confettiRef.current.play()
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (countdown <= 0) {
            setTimeout(() => {
                router.replace('/(home)')
            }, 0)
        }
    }, [countdown])

    return (
        <S.Container>
            <S.ConfettiOverlay>
                <Lottie
                    ref={confettiRef}
                    source={require('@/assets/lottie/confetti-animation.json')}
                    autoPlay
                    loop={false}
                    style={styles.confetti}
                    resizeMode="cover"
                />
            </S.ConfettiOverlay>

            <S.ContentContainer>
                <S.HeaderContainer>
                    <Text fontSize="2xl" fontWeight="700" textAlign="center">
                        Conta criada com sucesso!
                    </Text>
                    <Text
                        fontSize="base"
                        color="description"
                        textAlign="center"
                        style={styles.marginTop}
                    >
                        Você está pronto para começar a explorar o AgilMed e
                        descobrir todos os recursos disponíveis.
                    </Text>

                    <S.CountdownContainer>
                        <Text
                            fontSize="lg"
                            color="mainColor"
                            fontWeight="500"
                            textAlign="center"
                        >
                            Redirecionando em {countdown} segundos...
                        </Text>
                    </S.CountdownContainer>
                </S.HeaderContainer>
            </S.ContentContainer>
        </S.Container>
    )
}

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 16,
    },
    confetti: {
        width: '100%',
        height: '100%',
    },
})
