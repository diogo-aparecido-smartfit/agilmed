import React from 'react'
import { SearchNormal1 } from 'iconsax-react-native'
import { useTheme } from '@/hooks/useTheme'
import * as S from './search-bar.style'

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
    const { colors } = useTheme()

    return (
        <S.Container>
            <SearchNormal1 size={20} color={colors.description} />
            <S.Input
                placeholder={placeholder}
                placeholderTextColor={colors.description}
                value={value}
                onChangeText={onChangeText}
            />
        </S.Container>
    )
}
