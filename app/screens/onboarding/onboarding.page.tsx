import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { Theme } from '@/config/theme'
import { OnboardingNavigation } from '@/components/OnboardingNavigation/OnboardingNavigation'
import { EmailScreen } from './email-screen/email-screen.page'
import { IntroScreen } from './intro-screen/intro-screen.page'
import { PasswordScreen } from './password-screen/password-screen.page'
import { BirthdateScreen } from './birthdate-screen/birthdate-screen'
import { AppSettingsScreen } from './app-settings-screen/app-settings-screen'
import * as S from './onboarding.style'
import { TScreenMap, useOnboardingController } from './onboarding.controller'

const TOTAL_STEPS = 6

export default function OnboardingScreen() {
    const {
        currentStep,
        isLoading,
        isNextDisabled,
        handleNext,
        handlePrev,
        screenMap,
    } = useOnboardingController()

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
        backgroundColor: Theme.colors.background,
    },
    keyboardView: {
        flex: 1,
    },
})
