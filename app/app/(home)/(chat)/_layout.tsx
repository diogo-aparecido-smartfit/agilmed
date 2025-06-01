import { router, Stack } from 'expo-router'
import { ArrowLeft } from 'iconsax-react-native'
import { Platform, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { StatusBar } from 'expo-status-bar'

export default function StackLayout() {
    const theme = useTheme()
    const { darkMode } = useSelector((state: RootState) => state.settings)

    return (
        <>
            <StatusBar style="light" />
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
                                backgroundColor: theme.colors.mainColor,
                                height: Platform.OS === 'android' ? 70 : 90,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                paddingHorizontal: 24,
                            }}
                        >
                            <TouchableOpacity onPress={() => router.back()}>
                                <ArrowLeft
                                    size={24}
                                    color={theme.colors.white}
                                />
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
                                    backgroundColor: theme.colors.background,
                                    height: Platform.OS === 'android' ? 30 : 50,
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-end',
                                    paddingHorizontal: 24,
                                }}
                            />
                        ),
                        contentStyle: {
                            paddingTop: Platform.OS === 'android' ? 30 : 50,
                        },
                    }}
                    name="chat"
                />
            </Stack>
        </>
    )
}
