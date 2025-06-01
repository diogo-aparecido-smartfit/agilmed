import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
    checkOnboardingStatus,
    nextStep as nextStepAction,
    prevStep as prevStepAction,
    completeOnboarding,
} from '@/store/slices/onboarding.slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { AppSettingsScreen } from './app-settings-screen/app-settings-screen'
import { BirthdateScreen } from './birthdate-screen/birthdate-screen'
import { EmailScreen } from './email-screen/email-screen.page'
import { IntroScreen } from './intro-screen/intro-screen.page'
import { PasswordScreen } from './password-screen/password-screen.page'

const screenMap: Record<number, JSX.Element> = {
    0: <IntroScreen />,
    1: <BirthdateScreen />,
    2: <EmailScreen />,
    3: <PasswordScreen />,
    4: <AppSettingsScreen />,
}

export type TScreenMap = keyof typeof screenMap

export const useOnboardingController = () => {
    const dispatch = useDispatch()
    const {
        currentStep,
        isLoading,
        userData,
        termsAccepted,
        hasSeenOnboarding,
        privacyAccepted,
    } = useSelector((state: RootState) => state.onboarding)

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
        4: () => !(termsAccepted && privacyAccepted),
        5: () => false,
    }

    useEffect(() => {
        setIsNextDisabled(
            stepValidationMap[
                currentStep as keyof typeof stepValidationMap
            ]?.() ?? true
        )
    }, [currentStep, userData, termsAccepted, privacyAccepted])

    const handleNext = useCallback(() => {
        const TOTAL_STEPS = 6

        if (currentStep === TOTAL_STEPS - 2) {
            dispatch(completeOnboarding())
        } else if (currentStep === TOTAL_STEPS - 1) {
            // do nothing
        } else {
            dispatch(nextStepAction())
        }
    }, [currentStep, dispatch])

    const handlePrev = useCallback(() => {
        dispatch(prevStepAction())
    }, [dispatch])

    return {
        currentStep,
        isLoading,
        isNextDisabled,
        setIsNextDisabled,
        handleNext,
        handlePrev,
        userData,
        hasSeenOnboarding,
        screenMap,
    }
}
