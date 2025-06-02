import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { lightPalette, darkPalette } from '@/config/theme'
import Lottie from 'lottie-react-native'

interface ThemeTransitionProps {
    onTransitionComplete: () => void
}

const ANIMATION_DURATION = 1000

export const ThemeTransition: React.FC<ThemeTransitionProps> = ({
    onTransitionComplete,
}) => {
    const { darkMode } = useSelector((state: RootState) => state.settings)
    const [visible, setVisible] = useState(true)
    const lottieRef = useRef<Lottie>(null)

    const fadeAnim = useRef(new Animated.Value(0)).current
    const colorTransition = useRef(new Animated.Value(darkMode ? 1 : 0)).current
    const textFadeAnim = useRef(new Animated.Value(0)).current

    const hasCompletedRef = useRef(false)

    // Função para fazer fade out de forma garantida
    const performFadeOut = () => {
        // Primeiro fade out do texto
        Animated.timing(textFadeAnim, {
            toValue: 0,
            duration: ANIMATION_DURATION / 4,
            useNativeDriver: false,
        }).start()

        // Depois fade out da tela
        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: ANIMATION_DURATION / 3,
                useNativeDriver: false,
            }).start(() => {
                setVisible(false)
            })
        }, 200)
    }

    useEffect(() => {
        // Reset
        setVisible(true)
        hasCompletedRef.current = false
        fadeAnim.setValue(0)
        textFadeAnim.setValue(0)
        colorTransition.setValue(darkMode ? 1 : 0)

        if (lottieRef.current) {
            lottieRef.current.play()
        }

        // Fade in
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: ANIMATION_DURATION / 4,
            useNativeDriver: false,
        }).start()

        // Mostrar texto após pequeno delay
        setTimeout(() => {
            Animated.timing(textFadeAnim, {
                toValue: 1,
                duration: ANIMATION_DURATION / 4,
                useNativeDriver: false,
            }).start()
        }, 100)

        // Mudar cor de fundo
        setTimeout(() => {
            Animated.timing(colorTransition, {
                toValue: darkMode ? 1 : 0,
                duration: ANIMATION_DURATION / 2,
                useNativeDriver: false,
            }).start(() => {
                // Chamar onTransitionComplete
                if (!hasCompletedRef.current) {
                    hasCompletedRef.current = true
                    onTransitionComplete()
                }
            })
        }, 200)

        // Iniciar o fade out após um tempo
        const fadeOutTimer = setTimeout(() => {
            performFadeOut()
        }, ANIMATION_DURATION * 2)

        // Cleanup
        return () => {
            clearTimeout(fadeOutTimer)
            fadeAnim.stopAnimation()
            textFadeAnim.stopAnimation()
            colorTransition.stopAnimation()
        }
    }, [darkMode])

    const backgroundColor = colorTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [lightPalette.background, darkPalette.background],
    })

    const textColor = colorTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [lightPalette.title, darkPalette.title],
    })

    if (!visible) return null

    return (
        <Animated.View
            style={[
                styles.overlay,
                {
                    opacity: fadeAnim,
                    backgroundColor,
                },
            ]}
        >
            <View style={styles.contentContainer}>
                <Lottie
                    ref={lottieRef}
                    source={require('@/assets/lottie/theme-animation.json')}
                    style={styles.animation}
                    loop={true}
                    autoPlay={false}
                />

                <Animated.Text
                    style={[
                        styles.messageText,
                        {
                            opacity: textFadeAnim,
                            color: textColor,
                        },
                    ]}
                >
                    {darkMode
                        ? 'Ativando modo escuro...'
                        : 'Ativando modo claro...'}
                </Animated.Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: 150,
        height: 150,
    },
    messageText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center',
    },
})
