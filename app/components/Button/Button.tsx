import { Theme } from '@/config/theme'
import * as S from './style'
import { ActivityIndicator, TouchableOpacityProps } from 'react-native'

type ButtonVariant = 'primary' | 'destructive' | 'warning'

interface ButtonProps extends TouchableOpacityProps {
    isLoading?: boolean
    text: string
    backgroundColor?: string
    outlined?: boolean
    isSecondary?: boolean
    borderRadius?: number
    width?: string
    variant?: ButtonVariant
}

const Button = ({
    text,
    isLoading,
    backgroundColor,
    outlined,
    borderRadius,
    isSecondary,
    variant = 'primary',
    onPress,
    ...props
}: ButtonProps) => {
    if (isLoading) {
        return (
            <S.ButtonContainer
                disabled
                backgroundColor={backgroundColor}
                testID="loading-button"
                outlined={outlined}
                borderRadius={borderRadius}
                isSecondary={isSecondary}
                variant={variant}
                onPress={onPress}
                {...props}
            >
                <ActivityIndicator
                    color={
                        isSecondary
                            ? Theme.colors.mainColor
                            : !outlined
                            ? Theme.colors.white
                            : variant === 'destructive'
                            ? Theme.colors.error
                            : variant === 'warning'
                            ? Theme.colors.warning
                            : Theme.colors.mainColor
                    }
                />
            </S.ButtonContainer>
        )
    } else {
        return (
            <S.ButtonContainer
                testID="button-container"
                backgroundColor={backgroundColor}
                outlined={outlined}
                borderRadius={borderRadius}
                isSecondary={isSecondary}
                variant={variant}
                onPress={onPress}
                {...props}
            >
                <S.ButtonText
                    isSecondary={isSecondary}
                    outlined={outlined}
                    variant={variant}
                >
                    {text}
                </S.ButtonText>
            </S.ButtonContainer>
        )
    }
}

export default Button
