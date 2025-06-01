import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Theme } from '@/config/theme'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react-native'
import Animated, {
    useAnimatedStyle,
    withTiming,
    useDerivedValue,
    AnimatedProps,
} from 'react-native-reanimated'
import styled from '@emotion/native'
import Svg, { Circle } from 'react-native-svg'

interface OnboardingNavigationProps {
    currentStep: number
    totalSteps: number
    onNext: () => void
    onPrev: () => void
    isNextDisabled?: boolean
    isLoading?: boolean
}

export function OnboardingNavigation({
    currentStep,
    totalSteps,
    onNext,
    onPrev,
    isNextDisabled = false,
    isLoading = false,
}: OnboardingNavigationProps) {
    const progress = useDerivedValue(() => {
        return withTiming(currentStep / totalSteps, {
            duration: 300,
        })
    }, [currentStep, totalSteps])

    const animatedCircleStyle = useAnimatedStyle(() => {
        return {
            strokeDashoffset: 264 * (1 - progress.value),
        } as any
    })

    const buttonBackgroundColor =
        isNextDisabled || isLoading
            ? Theme.colors.lightDescription
            : Theme.colors.mainColor

    const circleColor =
        isNextDisabled || isLoading
            ? Theme.colors.lightDescription
            : Theme.colors.mainColor

    const baseCircleColor = Theme.colors.borderColor

    return (
        <NavigationContainer>
            <ButtonContainer>
                {currentStep > 0 ? (
                    <NavButton onPress={onPrev} disabled={isLoading}>
                        <ArrowLeft2 size={24} color={Theme.colors.white} />
                    </NavButton>
                ) : (
                    <View style={styles.emptyButton} />
                )}
            </ButtonContainer>

            <ProgressText>
                {currentStep + 1} de {totalSteps}
            </ProgressText>

            <ButtonContainer>
                <NavButton
                    onPress={onNext}
                    disabled={isNextDisabled || isLoading}
                    style={[{ backgroundColor: buttonBackgroundColor }]}
                >
                    {isLoading ? (
                        <LoadingIndicator
                            color={Theme.colors.white}
                            size="small"
                        />
                    ) : (
                        <ArrowRight2 size={24} color={Theme.colors.white} />
                    )}

                    <ProgressCircle>
                        <StyledSvg width={60} height={60} viewBox="0 0 60 60">
                            <StyledCircle
                                cx="30"
                                cy="30"
                                r="26"
                                stroke={baseCircleColor}
                                strokeWidth="4"
                                fill="transparent"
                            />
                            <AnimatedCircle
                                cx="30"
                                cy="30"
                                r="26"
                                stroke={circleColor}
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={264}
                                animatedProps={animatedCircleStyle}
                                strokeLinecap="round"
                            />
                        </StyledSvg>
                    </ProgressCircle>
                </NavButton>
            </ButtonContainer>
        </NavigationContainer>
    )
}

const NavigationContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    width: 100%;
    position: absolute;
    bottom: 40px;
`

const ButtonContainer = styled.View`
    width: 60px;
    height: 60px;
`

const NavButton = styled(TouchableOpacity)`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: ${Theme.colors.mainColor};
    justify-content: center;
    align-items: center;
    elevation: 4;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.23;
    shadow-radius: 2.62px;
`

const ProgressText = styled.Text`
    font-size: 14px;
    color: ${Theme.colors.description};
    font-weight: 600;
`

const ProgressCircle = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
`

const StyledSvg = styled(Svg)``

const StyledCircle = styled(Circle)``

const AnimatedCircle = Animated.createAnimatedComponent(styled(StyledCircle)``)

const LoadingIndicator = styled.ActivityIndicator``

const styles = StyleSheet.create({
    emptyButton: {
        width: 60,
        height: 60,
    },
})
