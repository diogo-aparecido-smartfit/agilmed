import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const HeaderContainer = styled.View`
    width: 100%;
    background-color: ${Theme.colors.white};
    border-bottom-width: 1px;
    border-bottom-color: ${Theme.colors.inputBackground};
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
        props.active ? Theme.colors.mainColor : Theme.colors.inputBackground};
    min-height: 36px;
    justify-content: center;
`

export const FilterButtonText = styled.Text<FilterButtonProps>`
    color: ${(props) =>
        props.active ? Theme.colors.white : Theme.colors.description};
    font-family: ${Theme.fonts.medium};
    font-size: 14px;
`
