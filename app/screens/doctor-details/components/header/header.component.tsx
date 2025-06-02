import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'iconsax-react-native'
import { useTheme } from '@/hooks/useTheme'
import styled from '@emotion/native'

interface HeaderProps {
    onBackPress: () => void
}

const HeaderContainer = styled.View`
    position: absolute;
    top: 48px;
    left: 16px;
    z-index: 10;
`

const BackButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.colors.cardBackground}90;
    justify-content: center;
    align-items: center;
`

export default function Header({ onBackPress }: HeaderProps) {
    const { colors } = useTheme()

    return (
        <HeaderContainer>
            <BackButton onPress={onBackPress}>
                <ArrowLeft size={24} color={colors.white} />
            </BackButton>
        </HeaderContainer>
    )
}
