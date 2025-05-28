import LayoutHeader from '@/components/LayoutHeader/LayoutHeader'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    paddingTop: Platform.OS === 'android' ? 70 : 90,
                },
                header: () => null,
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerBackVisible: false,
                    presentation: 'transparentModal',
                    contentStyle: {
                        paddingTop: 0,
                    },
                    header: () => <LayoutHeader hasBackButton />,
                }}
                name="verifyCode"
            />
        </Stack>
    )
}
