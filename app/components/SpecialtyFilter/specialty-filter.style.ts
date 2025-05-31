import { Theme } from '@/config/theme'
import styled from '@emotion/native'

export const Container = styled.View`
    margin: 8px 0px;
`

export const ScrollViewContainer = styled.ScrollView`
    height: auto;
`

interface FilterItemProps {
    active: boolean
}

export const FilterItem = styled.TouchableOpacity<FilterItemProps>`
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${(props) =>
        props.active ? Theme.colors.fillColor : Theme.colors.inputBackground};
    border-width: 1px;
    min-height: 40px;
    border-color: ${(props) =>
        props.active ? Theme.colors.mainColor : Theme.colors.description};
`
