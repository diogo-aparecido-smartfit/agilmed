import { Theme } from '@/config/theme'
import { router, Stack } from 'expo-router'
import { ArrowLeft } from 'iconsax-react-native'
import { Platform, TouchableOpacity, View } from 'react-native'

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
                header: () => (
                    <View
                        style={{
                            backgroundColor: Theme.colors.mainColor,
                            height: Platform.OS === 'android' ? 70 : 90,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                            paddingHorizontal: 24,
                        }}
                    >
                        <TouchableOpacity onPress={() => router.back()}>
                            <ArrowLeft size={24} color={Theme.colors.white} />
                        </TouchableOpacity>
                    </View>
                ),
            }}
            initialRouteName="index"
        >
            <Stack.Screen name="index" />
            <Stack.Screen
                options={{
                    header: () => (
                        <View
                            style={{
                                backgroundColor: Theme.colors.white,
                                height: Platform.OS === 'android' ? 30 : 40,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                paddingHorizontal: 24,
                            }}
                        />
                    ),
                    contentStyle: {
                        paddingTop: Platform.OS === 'android' ? 30 : 40,
                    },
                }}
                name="chat"
            />
        </Stack>
    )
}
