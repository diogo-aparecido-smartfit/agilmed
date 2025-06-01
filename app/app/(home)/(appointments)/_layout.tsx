import LayoutHeader from '@/components/LayoutHeader/LayoutHeader'
import { HEADER_OPTIONS } from '@/utils/utils'
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
                header: () => <LayoutHeader transparent />,
            }}
            initialRouteName="appointments"
        >
            <Stack.Screen options={HEADER_OPTIONS} name="appointments" />
            <Stack.Screen
                options={{
                    headerShown: false,
                    contentStyle: {
                        paddingTop: 0,
                    },
                }}
                name="details/[id]"
            />
        </Stack>
    )
}
