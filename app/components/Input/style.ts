import { Theme } from '@/config/theme'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import styled from '@emotion/native'

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

export const InputLabel = styled(Text)`
    color: ${Theme.colors.black};
    font-size: 16px;
    font-family: ${Theme.fonts.medium};
    margin-bottom: 12px;
`

export const InputText = styled(MaskedTextInput)`
    border-radius: 16px;
    padding: 16px;
    color: ${Theme.colors.black};
    font-size: 16px;
    background-color: ${Theme.colors.inputBackground};
    border-width: 1px;
    border-color: ${Theme.colors.borderColor};
`

export const ErrorText = styled(Text)`
    color: ${Theme.colors.error};
    font-family: ${Theme.fonts.regular};
    font-size: 14px;
`
