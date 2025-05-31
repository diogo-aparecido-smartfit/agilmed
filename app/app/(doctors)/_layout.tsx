import React from 'react'
import { Stack } from 'expo-router'

export default function DoctorsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="doctors-list"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: 'Detalhes do médico',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack>
    )
}
