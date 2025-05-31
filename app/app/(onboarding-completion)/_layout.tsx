import LayoutHeader from '@/components/LayoutHeader/LayoutHeader'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'

export default function StackLayout() {
    return (
        <Stack initialRouteName="completion">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="completion"
            />
        </Stack>
    )
}
