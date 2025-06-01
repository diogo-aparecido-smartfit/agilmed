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
import { OnboardingNavigation } from '@/components/OnboardingNavigation/OnboardingNavigation'
import { EmailScreen } from './email-screen/email-screen.page'
import { IntroScreen } from './intro-screen/intro-screen.page'
import { PasswordScreen } from './password-screen/password-screen.page'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as S from './onboarding.style'
import { AppSettingsScreen } from './app-settings-screen/app-settings-screen'

const screenMap: Record<number, JSX.Element> = {
    0: <IntroScreen />,
    1: <BirthdateScreen />,
    2: <EmailScreen />,
    3: <PasswordScreen />,
    4: <AppSettingsScreen />,
}

type TScreenMap = keyof typeof screenMap

const TOTAL_STEPS = 6

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
        const checkOnboardingStatus = async () => {
            try {
                const storedStatus = await AsyncStorage.getItem(
                    '@agilmed:hasSeenOnboarding'
                )
                if (storedStatus === 'true') {
                    router.replace('/(home)')
                }
            } catch (e) {
                console.error('Failed to check onboarding status:', e)
            }
        }

        checkOnboardingStatus()
    }, [])

    const stepValidationMap = {
        0: () =>
            !userData.full_name || userData.full_name.split(' ').length < 2,
        1: () => !userData.birthdate,
        2: () => !userData.email,
        3: () => !userData.password || userData.password.length < 6,
        4: () => false,
        5: () => false,
    }

    useEffect(() => {
        setIsNextDisabled(
            stepValidationMap[
                currentStep as keyof typeof stepValidationMap
            ]?.() ?? true
        )
    }, [currentStep, userData])

    const handleNext = () => {
        if (currentStep === TOTAL_STEPS - 2) {
            dispatch(completeOnboarding())
        } else if (currentStep === TOTAL_STEPS - 1) {
            // do nothing
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

    const renderStep = () =>
        screenMap[currentStep as TScreenMap] || <IntroScreen />

    return (
        <S.Container>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <S.ContentView>{renderStep()}</S.ContentView>

                <OnboardingNavigation
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS - 1}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isNextDisabled={isNextDisabled}
                    isLoading={isLoading}
                />
            </KeyboardAvoidingView>
        </S.Container>
    )
}

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
