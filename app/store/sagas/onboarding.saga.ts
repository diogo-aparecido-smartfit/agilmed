import { call, Effect, put, select, takeLatest } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    checkOnboardingStatus,
    completeOnboarding,
    completeOnboardingFailure,
    completeOnboardingSuccess,
    resetOnboarding,
    setOnboardingStatus,
} from '../slices/onboarding.slice'
import { RootState } from '@/store'
import { createUser } from '@/services/user/user.services'
import { loginSuccess } from '../slices/auth.slice'
import { generateRandomCPF } from '@/utils/utils'
import { showMessage } from 'react-native-flash-message'
import { authRef } from '@/providers/auth.provider'
import { router } from 'expo-router'

function* checkOnboardingStatusSaga(): Generator<Effect> {
    try {
        const hasSeenOnboarding = yield call(
            AsyncStorage.getItem,
            '@agilmed:hasSeenOnboarding'
        )
        yield put(setOnboardingStatus(hasSeenOnboarding === 'true'))
    } catch (error) {
        yield put(setOnboardingStatus(false))
    }
}

function* completeOnboardingSaga(): Generator<Effect> {
    try {
        const { userData } = yield select(
            (state: RootState) => state.onboarding
        )

        const randomCPF = generateRandomCPF()

        const completeUserData = {
            full_name: userData.full_name,
            email: userData.email,
            password: userData.password,
            birthdate: userData.birthdate,
            cpf: randomCPF,
            phone: '(31) 99999-9999',
            gender: 'not_informed',
            address: 'Av. João Naves de Ávila, 2121',
            city: 'Uberlândia',
            state: 'MG',
            blood_type: 'O+',
            allergies: 'Nenhuma',
            medical_history: 'Nenhum',
            role: 'patient',
        }

        const response = yield call(createUser, completeUserData)

        yield call(AsyncStorage.setItem, '@agilmed:hasSeenOnboarding', 'true')

        yield call(
            [AsyncStorage, AsyncStorage.setItem],
            'token',
            response.token
        )
        yield call(
            [AsyncStorage, AsyncStorage.setItem],
            'user',
            JSON.stringify(response.user)
        )

        yield put(loginSuccess({ token: response.token, user: response.user }))
        yield put(completeOnboardingSuccess())

        showMessage({
            message: 'Conta criada com sucesso!',
            type: 'success',
        })

        yield put({ type: 'auth/checkAuthState' })

        if (authRef.current) {
            yield call([authRef.current, authRef.current.checkAuthState])
        }

        router.replace('/(onboarding-completion)/completion')
    } catch (error: any) {
        showMessage({
            message:
                error?.message ||
                'Erro ao criar conta. Tente novamente mais tarde.',
            type: 'danger',
        })

        yield put(completeOnboardingFailure())
    }
}

function* resetOnboardingSaga(): Generator<Effect> {
    try {
        yield call(AsyncStorage.removeItem, '@agilmed:hasSeenOnboarding')
        yield call(AsyncStorage.removeItem, '@agilmed:onboardingData')

        showMessage({
            message: 'Dados resetados com sucesso',
            type: 'success',
        })

        if (authRef.current) {
            yield call([authRef.current, authRef.current.checkAuthState])
        }
    } catch (error) {
        console.error('Erro ao resetar onboarding:', error)

        showMessage({
            message: 'Erro ao resetar dados',
            type: 'danger',
        })
    }
}

export function* onboardingSaga() {
    yield takeLatest(checkOnboardingStatus.type, checkOnboardingStatusSaga)
    yield takeLatest(completeOnboarding.type, completeOnboardingSaga)
    yield takeLatest(resetOnboarding.type, resetOnboardingSaga)
}
