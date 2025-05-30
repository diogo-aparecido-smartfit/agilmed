import Lottie from 'lottie-react-native'
import { Theme } from '@/config/theme'
import { useAuth } from '@/providers/auth.provider'
import { router, Stack } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Text from '@/components/Text/Text'

function CustomSplashScreen({
    onAnimationComplete,
}: {
    onAnimationComplete: () => void
}) {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0.95)).current
    const lottieRef = useRef<Lottie>(null)

    useEffect(() => {
        // Iniciar a animação do Lottie
        if (lottieRef.current) {
            lottieRef.current.play()
        }

        // Animar o fade in e o scale
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 7,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start()

        // Configurar o timer para a animação de saída
        const timer = setTimeout(() => {
            // Animar o fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500, // Duração da animação de fade out
                useNativeDriver: true,
            }).start(() => {
                // Chamar o callback quando a animação terminar
                onAnimationComplete()
            })
        }, 2000) // Ajustado para iniciar o fade out um pouco antes

        return () => clearTimeout(timer)
    }, [fadeAnim, scaleAnim, onAnimationComplete])

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Lottie
                    ref={lottieRef}
                    source={require('@/assets/lottie/cat-animation.json')}
                    autoPlay
                    loop={true}
                    style={styles.animation}
                    resizeMode="cover"
                />
                <Text fontSize="3xl" fontWeight="700" color="mainColor">
                    AgilMed
                </Text>
            </Animated.View>
        </Animated.View>
    )
}

export default function MainNavigator() {
    const [showSplash, setShowSplash] = useState(true)
    const { isLoading, hasSeenOnboarding, userToken, isAuthenticated } =
        useAuth()

    const handleSplashComplete = () => {
        setShowSplash(false)
    }

    // Não precisamos mais do useEffect com setTimeout
    // A própria animação vai chamar handleSplashComplete quando terminar

    if (isLoading || showSplash) {
        return (
            <SafeAreaProvider>
                <CustomSplashScreen
                    onAnimationComplete={handleSplashComplete}
                />
            </SafeAreaProvider>
        )
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen
                    name="(home)"
                    options={{ headerShown: false, headerTitle: 'Home' }}
                />
                <Stack.Screen
                    name="(appointment)"
                    options={{ headerShown: false, headerTitle: 'Appointment' }}
                />
                <Stack.Screen
                    name="(places)"
                    options={{ headerShown: false, headerTitle: 'Places' }}
                />
                <Stack.Screen
                    name="(verifyCode)"
                    options={{ headerShown: false, headerTitle: 'VerifyCode' }}
                />
            </Stack.Protected>
            <Stack.Protected guard={hasSeenOnboarding !== false}>
                <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false, headerTitle: 'Auth' }}
                />
            </Stack.Protected>
            <Stack.Protected guard={hasSeenOnboarding !== true}>
                <Stack.Screen
                    name="(onboarding)"
                    options={{ headerShown: false, headerTitle: 'Onboarding' }}
                />
            </Stack.Protected>
            <Stack.Screen name="+not-found" />
        </Stack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.white,
    },
    content: {
        alignItems: 'center',
    },
    animation: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
})
