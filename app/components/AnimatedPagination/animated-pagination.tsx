import React from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Theme } from '@/config/theme'
import * as S from './animated-pagination.style'

interface AnimatedPaginationProps {
    totalItems: number
    activeIndex: number
    dotActiveColor?: string
    dotInactiveColor?: string
    dotSpacing?: number
    activeDotWidth?: number
    inactiveDotWidth?: number
    dotHeight?: number
    animationDuration?: number
}

export const AnimatedPagination = ({
    totalItems,
    activeIndex,
    dotActiveColor = Theme.colors.mainColor,
    dotInactiveColor = Theme.colors.mainColor,
    dotSpacing = 8,
    activeDotWidth = 12,
    inactiveDotWidth = 8,
    dotHeight = 8,
    animationDuration = 300,
}: AnimatedPaginationProps) => {
    return (
        <S.PaginationContainer style={{ gap: dotSpacing }}>
            {Array.from({ length: totalItems }).map((_, index) => {
                const animatedDotStyle = useAnimatedStyle(() => {
                    return {
                        width: withTiming(
                            index === activeIndex
                                ? activeDotWidth
                                : inactiveDotWidth,
                            { duration: animationDuration }
                        ),
                        opacity: withTiming(index === activeIndex ? 1 : 0.5, {
                            duration: animationDuration,
                        }),
                        transform: [
                            {
                                scale: withTiming(
                                    index === activeIndex ? 1.2 : 1,
                                    { duration: animationDuration }
                                ),
                            },
                        ],
                    }
                })

                return (
                    <S.PaginationDot
                        key={index}
                        active={index === activeIndex}
                        activeColor={dotActiveColor}
                        inactiveColor={dotInactiveColor}
                        height={dotHeight}
                        style={animatedDotStyle}
                    />
                )
            })}
        </S.PaginationContainer>
    )
}

export default AnimatedPagination
