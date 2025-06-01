import { TextInput, View } from 'react-native'
import styled from '@emotion/native'

export const Container = styled(View)`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const InputBox = styled(TextInput)`
    width: 64px;
    height: 56px;
    border-width: 1px;
    background-color: ${(props) => props.theme.colors.inputBackground};
    border-color: ${(props) => props.theme.colors.borderColor};
    color: ${(props) => props.theme.colors.mainColor};
    text-align: center;
    font-size: 18px;
    border-radius: 16px;
    padding: 0;
    font-size: 28px;
    font-family: ${(props) => props.theme.fonts.semiBold};
`
