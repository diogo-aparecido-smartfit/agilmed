import { Theme } from '@/config/theme'
import { TouchableOpacity, Text } from 'react-native'
import styled from '@emotion/native'

type ButtonVariant = 'primary' | 'destructive' | 'warning'

interface ButtonProps {
    backgroundColor?: string
    outlined?: boolean
    borderRadius?: number
    isSecondary?: boolean
    width?: string
    variant?: ButtonVariant
    disabled?: boolean
}

const getBackgroundColor = (props: ButtonProps) => {
    const { backgroundColor, outlined, isSecondary, disabled, variant } = props

    if (disabled) return Theme.colors.lightDescription
    if (isSecondary) return Theme.colors.fillColor
    if (outlined) return 'transparent'

    if (backgroundColor) return backgroundColor

    switch (variant) {
        case 'destructive':
            return Theme.colors.error || '#D32F2F'
        case 'warning':
            return Theme.colors.warning || '#F9A825'
        case 'primary':
        default:
            return Theme.colors.mainColor
    }
}

const getBorderColor = (props: ButtonProps) => {
    const { variant } = props

    switch (variant) {
        case 'destructive':
            return Theme.colors.error || '#D32F2F'
        case 'warning':
            return Theme.colors.warning || '#F9A825'
        case 'primary':
        default:
            return Theme.colors.mainColor
    }
}

export const ButtonContainer = styled(TouchableOpacity)<ButtonProps>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${getBackgroundColor};
    padding: 16px;
    border-radius: ${({ borderRadius }) =>
        borderRadius ? `${borderRadius}px` : '32px'};
    width: ${({ width }) => (width ? width : '100%')};
    border-width: ${({ outlined }) => (outlined ? '1px' : '0px')};
    border-color: ${getBorderColor};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

interface ButtonTextProps {
    outlined?: boolean
    isSecondary?: boolean
    variant?: ButtonVariant
}

const getTextColor = (props: ButtonTextProps) => {
    const { outlined, isSecondary, variant } = props

    if (isSecondary) return Theme.colors.mainColor

    if (outlined) {
        switch (variant) {
            case 'destructive':
                return Theme.colors.error || '#D32F2F'
            case 'warning':
                return Theme.colors.warning || '#F9A825'
            case 'primary':
            default:
                return Theme.colors.mainColor
        }
    }

    return Theme.colors.white
}

export const ButtonText = styled(Text)<ButtonTextProps>`
    font-size: 16px;
    color: ${getTextColor};
    font-family: ${({ isSecondary }) =>
        isSecondary ? Theme.fonts.medium : Theme.fonts.bold};
`
