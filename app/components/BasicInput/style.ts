import { View, Text, TouchableOpacity } from 'react-native'
import styled from '@emotion/native'
import { Theme } from '@emotion/react'

interface ThemeProps {
    theme: Theme
}

export const InputContainer = styled(View)`
    flex: 1;
    flex-direction: column;
    margin-bottom: 12px;
    position: relative;
`

export const IconContainer = styled(TouchableOpacity)`
    position: absolute;
    right: 5%;
    top: 50%;
`

export const InputText = styled.TextInput`
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
