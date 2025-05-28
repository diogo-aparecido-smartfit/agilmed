import LayoutHeader from '@/components/LayoutHeader/LayoutHeader'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                contentStyle: {
                    paddingTop: Platform.OS === 'android' ? 70 : 90,
                },
                header: () => <LayoutHeader hasBackButton />,
            }}
            initialRouteName="login"
        >
            <Stack.Screen
                options={{
                    header: () => <LayoutHeader />,
                }}
                name="login"
            />
            <Stack.Screen name="password" />
            <Stack.Screen name="register" />
            <Stack.Screen
                name="verifyCode"
                options={{
                    presentation: 'modal',
                }}
            />
            <Stack.Screen name="resetPassword" />
        </Stack>
    )
}
