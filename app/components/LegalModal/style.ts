import styled from '@emotion/native'

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 16px 24px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors.divider};
`

export const EmptySpace = styled.View`
    width: 24px;
`

export const Footer = styled.View`
    padding: 16px 24px;
    border-top-width: 1px;
    border-top-color: ${(props) => props.theme.colors.divider};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.colors.background};
`

export const CloseButton = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.colors.mainColor};
    padding: 16px;
    border-radius: 12px;
    align-items: center;
`
