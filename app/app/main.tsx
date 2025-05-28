import { loginSuccess } from '@/store/slices/auth.slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { router, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function MainNavigator() {
    const dispatch = useDispatch()

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem('token')
            const storedUser = await AsyncStorage.getItem('user')

            if (token && storedUser) {
                dispatch(
                    loginSuccess({
                        token,
                        user: JSON.parse(storedUser || '{}'),
                    })
                )
            } else {
                return router.replace('/(auth)/login')
            }
        }
        loadToken()
    }, [])

    return (
        <Stack>
            <Stack.Screen
                name="(home)"
                options={{ headerShown: false, headerTitle: 'Home' }}
            />
            <Stack.Screen
                name="(auth)"
                options={{ headerShown: false, headerTitle: 'Auth' }}
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
            <Stack.Screen name="+not-found" />
        </Stack>
    )
}
