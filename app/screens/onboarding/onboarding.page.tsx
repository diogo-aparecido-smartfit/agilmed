import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
    checkOnboardingStatus,
    nextStep as nextStepAction,
    prevStep as prevStepAction,
    completeOnboarding,
} from '@/store/slices/onboarding.slice'
import { BirthdateScreen } from './birthdate-screen/birthdate-screen'
import {
    ActivityIndicator,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { Theme } from '@/config/theme'
import { router } from 'expo-router'
import styled from '@emotion/native'
import { OnboardingNavigation } from '@/components/OnboardingNavigation/OnboardingNavigation'
import { EmailScreen } from './email-screen/email-screen.page'
import { IntroScreen } from './intro-screen/intro-screen.page'
import { PasswordScreen } from './password-screen/password-screen.page'

const TOTAL_STEPS = 4

export default function OnboardingScreen() {
    const dispatch = useDispatch()
    const { currentStep, isLoading, hasSeenOnboarding, userData } = useSelector(
        (state: RootState) => state.onboarding
    )

    const [isNextDisabled, setIsNextDisabled] = useState(true)

    useEffect(() => {
        dispatch(checkOnboardingStatus())
    }, [dispatch])

    useEffect(() => {
        if (hasSeenOnboarding) {
            router.replace('/(home)')
        }
    }, [hasSeenOnboarding])

    useEffect(() => {
        switch (currentStep) {
            case 0:
                setIsNextDisabled(
                    !userData.full_name ||
                        userData.full_name.split(' ').length < 2
                )
                break
            case 1:
                setIsNextDisabled(!userData.birthdate)
                break
            case 2:
                setIsNextDisabled(!userData.email)
                break
            case 3:
                setIsNextDisabled(
                    !userData.password || userData.password.length < 6
                )
                break
            default:
                setIsNextDisabled(true)
        }
    }, [currentStep, userData])

    const handleNext = () => {
        if (currentStep === TOTAL_STEPS - 1) {
            dispatch(completeOnboarding())
        } else {
            dispatch(nextStepAction())
        }
    }

    const handlePrev = () => {
        dispatch(prevStepAction())
    }

    if (isLoading && currentStep === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color={Theme.colors.mainColor}
                />
            </View>
        )
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <IntroScreen />
            case 1:
                return <BirthdateScreen />
            case 2:
                return <EmailScreen />
            case 3:
                return <PasswordScreen />
            default:
                return <IntroScreen />
        }
    }

    return (
        <Container>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ContentView>{renderStep()}</ContentView>

                <OnboardingNavigation
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isNextDisabled={isNextDisabled}
                    isLoading={isLoading}
                />
            </KeyboardAvoidingView>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${Theme.colors.white};
`

const ContentView = styled.View`
    flex: 1;
    padding-bottom: 120px;
`

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.white,
    },
    keyboardView: {
        flex: 1,
    },
})
