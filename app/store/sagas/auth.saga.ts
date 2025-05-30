import { showMessage } from 'react-native-flash-message'
import { put, call, takeLatest, Effect } from 'redux-saga/effects'
import { router } from 'expo-router'
import {
    userLogin,
    createUser,
    resetPassword,
    verifyCode,
} from '@/services/user/user.services'
import { IUserData } from '@/types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    loginFailure,
    loginSuccess,
    registerFailure,
    registerSuccess,
    resetPasswordFailure,
    resetPasswordSuccess,
    verifyCodeFailure,
    verifyCodeSuccess,
} from '../slices/auth.slice'
import {
    LoginAction,
    RegisterAction,
    ResetPasswordAction,
    VerifyCodeAction,
} from '../actions/actions'
import { clearStorage } from '@/utils/utils'

function* loginSaga(action: LoginAction): Generator<Effect> {
    try {
        const data = yield call(userLogin, action.payload)
        const response = <{ token: string; user: IUserData }>data

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
        router.push('/(home)')
    } catch (error: any) {
        const errorMessage =
            error?.response?.data?.message ||
            'Credenciais inválidas ou erro de rede.'
        showMessage({
            message: errorMessage,
            type: 'danger',
        })
        yield put(loginFailure(errorMessage))
    }
}

function* registerSaga(action: RegisterAction): Generator<Effect> {
    try {
        const data = yield call(createUser, action.payload)
        const response = <{ token: string; user: IUserData }>data

        showMessage({
            message:
                'Código de confirmação enviado. Por favor, verifique seu email.',
            type: 'info',
        })

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

        yield put(
            registerSuccess({ token: response.token, user: response.user })
        )
        router.push('/(home)')
    } catch (error) {
        console.error(error)
        showMessage({
            message: 'Erro ao registrar. Tente novamente mais tarde.',
            type: 'danger',
        })
        yield put(registerFailure('Erro ao registrar. Tente novamente.'))
    }
}

function* resetPasswordSaga(action: ResetPasswordAction): Generator<Effect> {
    try {
        const data = yield call(resetPassword, action.payload)
        const response = <{ message: string; email: string }>data

        router.push({
            pathname: '/(auth)/verifyCode',
            params: {
                resetPassword: 'true',
                password: action.payload.typed_password,
                email: response.email,
            },
        })
        yield put(resetPasswordSuccess())
    } catch (error) {
        console.error(error)
        showMessage({
            message:
                'Não foi possível resetar a senha, por favor, tente novamente mais tarde.',
            type: 'danger',
        })
        yield put(resetPasswordFailure('Não foi possível resetar a senha.'))
    }
}

function* verifyCodeSaga(action: VerifyCodeAction): Generator<Effect> {
    try {
        const { document, code, typed_password, password_confirm } =
            action.payload

        const data = yield call(
            verifyCode,
            document,
            code,
            typed_password,
            password_confirm
        )

        const response = <{ token: string; user: IUserData }>data

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

        yield put(
            verifyCodeSuccess({ token: response.token, user: response.user })
        )

        showMessage({
            message: 'Código confirmado com sucesso.',
            type: 'success',
        })

        router.replace('/(home)')
    } catch (error) {
        console.error(error)
        showMessage({
            message: 'Código incorreto.',
            type: 'danger',
        })
        yield put(
            verifyCodeFailure('Erro ao verificar código. Tente novamente.')
        )
    }
}

function* logoffSaga(): Generator<Effect> {
    try {
        yield call(clearStorage)
    } catch (error) {
        console.error('Erro ao fazer logoff', error)
    }
}

export function* authSaga() {
    yield takeLatest('auth/loginRequest', loginSaga)
    yield takeLatest('auth/registerRequest', registerSaga)
    yield takeLatest('auth/resetPasswordRequest', resetPasswordSaga)
    yield takeLatest('auth/verifyCodeRequest', verifyCodeSaga)
    yield takeLatest('auth/logoffRequest', logoffSaga)
}
