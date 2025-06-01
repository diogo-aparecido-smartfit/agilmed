import * as S from './style'
import { Icon } from 'iconsax-react-native'
import { MaskedTextInputProps } from 'react-native-mask-text'
import Text from '../Text/Text'
import { useTheme } from '@emotion/react'

interface InputProps extends MaskedTextInputProps {
    error?: string
    mask?: string
    label?: string
    icon?: {
        Icon: Icon
        color?: string
        size?: number
        onPress?: () => void
    }
}

const Input = ({ error, label, icon, ...props }: InputProps) => {
    const theme = useTheme()

    return (
        <S.InputContainer>
            <Text fontWeight="600" style={{ marginBottom: 12 }}>
                {label}
            </Text>
            <S.InputText
                placeholderTextColor={theme.colors.inputColor}
                focusable={true}
                {...props}
                onFocus={(e) => {
                    e.target.setNativeProps({
                        style: {
                            borderColor: !error
                                ? theme.colors.mainColor
                                : theme.colors.error,
                        },
                    })
                }}
                onBlur={(e) => {
                    e.target.setNativeProps({
                        style: {
                            borderColor: !error
                                ? theme.colors.borderColor
                                : theme.colors.error,
                        },
                    })
                }}
            />
            {icon && (
                <S.IconContainer onPress={icon.onPress}>
                    {
                        <icon.Icon
                            color={icon.color || theme.colors.icon}
                            size={icon.size}
                        />
                    }
                </S.IconContainer>
            )}
            <S.ErrorText>{error}</S.ErrorText>
        </S.InputContainer>
    )
}

export default Input
