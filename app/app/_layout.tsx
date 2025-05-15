import FlashMessage from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import {
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins'
import { ThemeProvider } from '@emotion/react'

import { Theme } from '@/config/theme'
import { QueryProvider } from '@/providers/query.provider'
import { Provider } from 'react-redux'
import Main from './main'
import store from '@/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    })

    SplashScreen.setOptions({
        duration: 1000,
        fade: true,
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    useEffect(() => {
        const token = AsyncStorage.getItem('token')

        if (!token) {
            router.replace('/(auth)/login')
        }
    }, [])

    if (!loaded) {
        return null
    }

    return (
        <Provider store={store}>
            <GestureHandlerRootView>
                <FlashMessage position="top" />
                <QueryProvider>
                    <ThemeProvider theme={Theme}>
                        <Main />
                        <StatusBar style="auto" />
                    </ThemeProvider>
                </QueryProvider>
            </GestureHandlerRootView>
        </Provider>
    )
}
