import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    IRegisterUserData,
    IResetPasswordData,
    IUserData,
    IVerifyCodePayload,
} from '@/types/types'

interface AuthState {
    token: string | null
    user: IUserData | null
    isLoading: boolean
    error?: string
}

const initialState: AuthState = {
    token: null,
    user: null,
    isLoading: false,
    error: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (
            state,
            action: PayloadAction<{ identifier: string; password: string }>
        ) => {
            state.isLoading = true
            state.error = undefined
        },
        loginSuccess: (
            state,
            action: PayloadAction<{ token: string; user: IUserData }>
        ) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.isLoading = false
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        registerRequest: (state, action: PayloadAction<IRegisterUserData>) => {
            state.isLoading = true
            state.error = undefined
        },
        registerSuccess: (
            state,
            action: PayloadAction<{ token: string; user: IUserData }>
        ) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.isLoading = false
            state.error = undefined
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        resetPasswordRequest: (
            state,
            action: PayloadAction<IResetPasswordData>
        ) => {
            state.isLoading = true
            state.error = undefined
        },
        resetPasswordSuccess: (state) => {
            state.isLoading = false
        },
        resetPasswordFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        verifyCodeRequest: (
            state,
            action: PayloadAction<IVerifyCodePayload>
        ) => {
            state.isLoading = true
            state.error = undefined
        },
        verifyCodeSuccess: (
            state,
            action: PayloadAction<{ token: string; user: IUserData }>
        ) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.isLoading = false
        },
        verifyCodeFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        logoffRequest(state) {
            state.token = null
            state.user = null
            state.isLoading = false
        },
        updateUser(state, action: PayloadAction<Partial<IUserData>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
            }
        },
    },
})

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
    verifyCodeFailure,
    verifyCodeRequest,
    verifyCodeSuccess,
    logoffRequest,
    updateUser,
} = authSlice.actions

export default authSlice.reducer
