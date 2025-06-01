import styled from '@emotion/native'
import Animated from 'react-native-reanimated'
import { Theme } from '@/config/theme'

interface PaginationDotProps {
    active: boolean
    activeColor?: string
    inactiveColor?: string
    height?: number
}

export const PaginationContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const PaginationDot = styled(Animated.View)<PaginationDotProps>`
    height: ${({ height }) => height || 8}px;
    border-radius: 4px;
    background-color: ${({ active, activeColor, inactiveColor }) =>
        active
            ? activeColor || Theme.colors.mainColor
            : inactiveColor || Theme.colors.mainColor};
`
