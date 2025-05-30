import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '@/store/slices/auth.slice'
import { setOnboardingStatus } from '@/store/slices/onboarding.slice'

type AuthState = {
    isLoading: boolean
    hasSeenOnboarding: boolean | null
    userToken: string | null
    userData: any | null
    isAuthenticated: boolean // Novo estado para verificar se o usuário está logado
}

type AuthContextType = AuthState & {
    checkAuthState: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState<AuthState>({
        isLoading: true,
        hasSeenOnboarding: null,
        userToken: null,
        userData: null,
        isAuthenticated: false, // Inicialmente não autenticado
    })

    const checkAuthState = async () => {
        try {
            setState((prev) => ({ ...prev, isLoading: true }))

            const hasSeenOnboardingValue = await AsyncStorage.getItem(
                '@agilmed:hasSeenOnboarding'
            )
            const hasSeenOnboarding = hasSeenOnboardingValue === 'true'

            const userToken = await AsyncStorage.getItem('token')
            const userDataString = await AsyncStorage.getItem('user')
            const userData = userDataString ? JSON.parse(userDataString) : null

            // Determinar se o usuário está autenticado
            const isAuthenticated = !!(userToken && userData)

            if (isAuthenticated) {
                dispatch(loginSuccess({ token: userToken, user: userData }))
            }

            dispatch(setOnboardingStatus(hasSeenOnboarding))

            setState({
                isLoading: false,
                hasSeenOnboarding,
                userToken,
                userData,
                isAuthenticated, // Atualizar estado de autenticação
            })
        } catch (error) {
            console.error('Erro ao verificar estado de autenticação:', error)
            setState({
                isLoading: false,
                hasSeenOnboarding: false,
                userToken: null,
                userData: null,
                isAuthenticated: false, // Não autenticado em caso de erro
            })
        }
    }

    useEffect(() => {
        checkAuthState()
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, checkAuthState }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
