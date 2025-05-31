import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { SearchNormal1 } from 'iconsax-react-native'
import { Theme } from '@/config/theme'

interface SearchBarProps {
    placeholder: string
    value: string
    onChangeText: (text: string) => void
}

export function SearchBar({
    placeholder,
    value,
    onChangeText,
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <SearchNormal1 size={20} color={Theme.colors.description} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={Theme.colors.description}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.inputBackground,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontFamily: Theme.fonts.regular,
        fontSize: 16,
        color: Theme.colors.black,
    },
})
