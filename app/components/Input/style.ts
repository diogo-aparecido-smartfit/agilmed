import { View, Text, TouchableOpacity } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import styled from '@emotion/native'
import { Theme } from '@emotion/react'
import { ThemeProps } from '@/types/types'

export const InputContainer = styled(View)`
    flex: 1;
    flex-direction: column;
    margin-bottom: 12px;
`

export const IconContainer = styled(TouchableOpacity)`
    position: absolute;
    right: 5%;
    bottom: 28%;
`

export const InputText = styled(MaskedTextInput)`
    border-radius: 16px;
    padding: 16px;
    color: ${(props: ThemeProps) => props.theme.colors.title};
    font-size: 16px;
    background-color: ${(props: ThemeProps) =>
        props.theme.colors.inputBackground};
    border-width: 1px;
    border-color: ${(props: ThemeProps) => props.theme.colors.borderColor};
`

export const ErrorText = styled(Text)`
    color: ${(props: ThemeProps) => props.theme.colors.error};
    font-family: ${(props: ThemeProps) => props.theme.fonts.regular};
    font-size: 14px;
`
