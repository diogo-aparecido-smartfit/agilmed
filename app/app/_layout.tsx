import FlashMessage from 'react-native-flash-message'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
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

import { PortalProvider } from '@gorhom/portal'
import { darkPalette, lightPalette, ThemeBase } from '@/config/theme'
import { QueryProvider } from '@/providers/query.provider'
import { Provider, useSelector } from 'react-redux'
import Main from './main'
import store, { RootState } from '@/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthProvider } from '@/providers/auth.provider'
import { AppThemeProvider } from '@/providers/theme.provider'

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

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <Provider store={store}>
            <AppThemeProvider>
                <AuthProvider>
                    <GestureHandlerRootView>
                        <PortalProvider>
                            <FlashMessage position="top" />
                            <QueryProvider>
                                <Main />
                            </QueryProvider>
                        </PortalProvider>
                    </GestureHandlerRootView>
                </AuthProvider>
            </AppThemeProvider>
        </Provider>
    )
}
