import { Theme } from '@/config/theme'
import { TouchableOpacity, Text } from 'react-native'
import styled from '@emotion/native'

interface ButtonProps {
    backgroundColor?: string
    outlined?: boolean
    borderRadius?: number
    isSecondary?: boolean
    width?: string
}

export const ButtonContainer = styled(TouchableOpacity)<ButtonProps>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${({ backgroundColor, outlined, isSecondary }) =>
        isSecondary
            ? Theme.colors.fillColor
            : !outlined
            ? backgroundColor ?? Theme.colors.mainColor
            : 'transparent'};
    padding: 16px;
    border-radius: ${({ borderRadius }) =>
        borderRadius ? `${borderRadius}px` : '32px'};
    width: ${({ width }) => (width ? width : '100%')};
    border-width: ${({ outlined }) => (outlined ? '1px' : '0px')};
    border-color: ${Theme.colors.mainColor};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

export const ButtonText = styled(Text)<{
    outlined?: boolean
    isSecondary?: boolean
}>`
    font-size: 16px;
    color: ${({ outlined, isSecondary }) =>
        isSecondary
            ? Theme.colors.mainColor
            : outlined
            ? Theme.colors.mainColor
            : Theme.colors.white};
    font-family: ${({ isSecondary }) =>
        isSecondary ? Theme.fonts.medium : Theme.fonts.bold};
`
