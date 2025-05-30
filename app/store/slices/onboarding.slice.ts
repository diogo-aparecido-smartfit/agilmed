import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface OnboardingState {
    hasSeenOnboarding: boolean
    isLoading: boolean
    currentStep: number
    userData: {
        full_name: string
        birthdate: string
        email: string
        password: string
    }
}

const initialState: OnboardingState = {
    hasSeenOnboarding: false,
    isLoading: false,
    currentStep: 0,
    userData: {
        full_name: '',
        birthdate: '',
        email: '',
        password: '',
    },
}

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        checkOnboardingStatus(state) {
            state.isLoading = true
        },
        setOnboardingStatus(state, action: PayloadAction<boolean>) {
            state.hasSeenOnboarding = action.payload
            state.isLoading = false
        },
        updateOnboardingData(
            state,
            action: PayloadAction<Partial<OnboardingState['userData']>>
        ) {
            state.userData = { ...state.userData, ...action.payload }
        },
        nextStep(state) {
            state.currentStep += 1
        },
        prevStep(state) {
            state.currentStep = Math.max(0, state.currentStep - 1)
        },
        resetOnboarding(state) {
            state.currentStep = 0
            state.userData = initialState.userData
        },
        completeOnboarding(state) {
            state.isLoading = true
        },
        completeOnboardingSuccess(state) {
            state.hasSeenOnboarding = true
            state.isLoading = false
            state.currentStep = 0
        },
        completeOnboardingFailure(state) {
            state.isLoading = false
        },
    },
})

export const {
    checkOnboardingStatus,
    setOnboardingStatus,
    updateOnboardingData,
    nextStep,
    prevStep,
    resetOnboarding,
    completeOnboarding,
    completeOnboardingSuccess,
    completeOnboardingFailure,
} = onboardingSlice.actions

export default onboardingSlice.reducer
