import { Tabs, useSegments } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Home, Calendar2, Message, Profile } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { Platform } from 'react-native'
import styled from '@emotion/native'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ThemeProvider } from '@emotion/react'

const Container = styled.View<{ focused: boolean }>`
    padding: 14px;
    border-radius: 12px;
    background-color: ${({ focused, theme }) =>
        focused ? theme.colors.fillColor : 'transparent'};
`

const TabBarIcon = ({
    focused,
    children,
}: {
    focused: boolean
    children: React.ReactNode
}) => {
    if (!children) {
        return null
    }

    return <Container focused={focused}>{children}</Container>
}

export default function TabLayout() {
    const { darkMode } = useSelector((state: RootState) => state.settings)

    const getBackgroundColor = () =>
        darkMode ? Theme.colors.black : Theme.colors.white
    const getBorderColor = () =>
        darkMode ? Theme.colors.borderColor : '#E5E5E5'

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Theme.colors.mainColor,
                tabBarInactiveTintColor: darkMode
                    ? Theme.colors.lightGray
                    : Theme.colors.description,
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 100 : 80,
                    borderTopWidth: 1,
                    borderTopColor: getBorderColor(),
                    backgroundColor: getBackgroundColor(),
                    shadowOpacity: 0,
                    elevation: 0,
                },
                tabBarItemStyle: {
                    top: 20,
                },
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon focused={focused}>
                            <Home
                                size={24}
                                variant={focused ? 'Bold' : 'Outline'}
                                color={color}
                            />
                        </TabBarIcon>
                    ),
                }}
            />
            <Tabs.Screen
                name="(appointments)"
                options={{
                    title: 'Appointments',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon focused={focused}>
                            <Calendar2
                                size={24}
                                variant={focused ? 'Bold' : 'Outline'}
                                color={color}
                            />
                        </TabBarIcon>
                    ),
                }}
            />
            <Tabs.Screen
                name="(chat)"
                options={{
                    title: 'Chat',
                    tabBarStyle: {
                        display: 'none',
                        backgroundColor: getBackgroundColor(),
                        borderTopColor: getBorderColor(),
                    },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon focused={focused}>
                            <Message
                                size={24}
                                variant={focused ? 'Bold' : 'Outline'}
                                color={color}
                            />
                        </TabBarIcon>
                    ),
                }}
            />
            <Tabs.Screen
                name="(settings)"
                options={{
                    title: 'Settings',
                    tabBarStyle: {
                        display: 'none',
                        backgroundColor: getBackgroundColor(),
                        borderTopColor: getBorderColor(),
                    },
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon focused={focused}>
                            <Profile
                                size={24}
                                variant={focused ? 'Bold' : 'Outline'}
                                color={color}
                            />
                        </TabBarIcon>
                    ),
                }}
            />
        </Tabs>
    )
}
