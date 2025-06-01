import LayoutHeader from '@/components/LayoutHeader/LayoutHeader'
import { Theme } from '@/config/theme'
import { HEADER_OPTIONS } from '@/utils/utils'
import { Stack } from 'expo-router'
import { Platform, View } from 'react-native'

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
            initialRouteName="settings"
        >
            <Stack.Screen
                options={{
                    animation: 'slide_from_right',
                }}
                name="settings"
            />
            <Stack.Screen options={HEADER_OPTIONS} name="edit-profile" />
            <Stack.Screen options={HEADER_OPTIONS} name="security" />
            <Stack.Screen options={HEADER_OPTIONS} name="privacy" />
        </Stack>
    )
}
