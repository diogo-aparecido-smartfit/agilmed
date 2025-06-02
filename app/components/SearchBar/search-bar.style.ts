import styled from '@emotion/native'

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.theme.colors.inputBackground};
    border-radius: 8px;
    padding-horizontal: 12px;
    padding-vertical: 10px;
`

export const Input = styled.TextInput`
    flex: 1;
    margin-left: 8px;
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: 16px;
    color: ${(props) => props.theme.colors.title};
`
