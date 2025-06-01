import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const HeaderContainer = styled.View`
    width: 100%;
    background-color: ${(props) => props.theme.colors.background};
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.colors.inputBackground};
`

export const ButtonsScroll = styled.ScrollView`
    width: 100%;
`

interface FilterButtonProps {
    active: boolean
}

export const FilterButton = styled.TouchableOpacity<FilterButtonProps>`
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${(props) =>
        props.active
            ? (props) => props.theme.colors.mainColor
            : (props) => props.theme.colors.inputBackground};
    min-height: 36px;
    justify-content: center;
`

export const FilterButtonText = styled.Text<FilterButtonProps>`
    color: ${(props) =>
        props.active
            ? (props) => props.theme.colors.white
            : (props) => props.theme.colors.description};
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: 14px;
`
