import { Theme } from '@/config/theme'
import * as S from './style'
import { ActivityIndicator, TouchableOpacityProps, View } from 'react-native'
import React, { ReactNode } from 'react'

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
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    iconSpacing?: number
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
    leftIcon,
    rightIcon,
    iconSpacing = 8,
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
                {leftIcon && (
                    <View style={{ marginRight: iconSpacing }}>{leftIcon}</View>
                )}
                <S.ButtonText
                    isSecondary={isSecondary}
                    outlined={outlined}
                    variant={variant}
                >
                    {text}
                </S.ButtonText>
                {rightIcon && (
                    <View style={{ marginLeft: iconSpacing }}>{rightIcon}</View>
                )}
            </S.ButtonContainer>
        )
    }
}

export default Button
