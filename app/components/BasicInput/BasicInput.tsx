import * as S from './style'
import { Theme } from '@/config/theme'
import { Icon } from 'iconsax-react-native'
import { TextInputProps } from 'react-native'
import Text from '../Text/Text'
import { useTheme } from '@/hooks/useTheme'

interface InputProps extends TextInputProps {
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

const BasicInput = ({ error, label, icon, ...props }: InputProps) => {
    const theme = useTheme()

    return (
        <S.InputContainer>
            <Text fontWeight="600" style={{ marginBottom: 12 }}>
                {label}
            </Text>
            <S.InputText
                focusable={true}
                {...props}
                placeholderTextColor={theme.colors.inputColor}
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
                            size={icon.size || 20}
                        />
                    }
                </S.IconContainer>
            )}
            <S.ErrorText>{error}</S.ErrorText>
        </S.InputContainer>
    )
}

export default BasicInput
