import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    createRef,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '@/store/slices/auth.slice'
import { setOnboardingStatus } from '@/store/slices/onboarding.slice'

type AuthState = {
    isLoading: boolean
    hasSeenOnboarding: boolean | null
    userToken: string | null
    userData: any | null
    isAuthenticated: boolean
}

type AuthContextType = AuthState & {
    checkAuthState: () => Promise<void>
    forceRemount: () => void
}

export const authRef = createRef<{ checkAuthState: () => Promise<void> }>()

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const dispatch = useDispatch()
    const [remountKey, setRemountKey] = useState(0)
    const [state, setState] = useState<AuthState>({
        isLoading: true,
        hasSeenOnboarding: null,
        userToken: null,
        userData: null,
        isAuthenticated: false,
    })

    const forceRemount = useCallback(() => {
        setRemountKey((prev) => prev + 1)
    }, [])

    const checkAuthState = async () => {
        try {
            console.log('checkAuthState executado')
            setState((prev) => ({ ...prev, isLoading: true }))

            const hasSeenOnboardingValue = await AsyncStorage.getItem(
                '@agilmed:hasSeenOnboarding'
            )
            const hasSeenOnboarding = hasSeenOnboardingValue === 'true'

            const userToken = await AsyncStorage.getItem('token')
            const userDataString = await AsyncStorage.getItem('user')
            const userData = userDataString ? JSON.parse(userDataString) : null

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
                isAuthenticated,
            })
        } catch (error) {
            console.error('Erro ao verificar estado de autenticação:', error)
            setState({
                isLoading: false,
                hasSeenOnboarding: false,
                userToken: null,
                userData: null,
                isAuthenticated: false,
            })
        }
    }

    useEffect(() => {
        authRef.current = { checkAuthState }
    }, [checkAuthState])

    useEffect(() => {
        checkAuthState()
    }, [])

    return (
        <AuthContext.Provider
            value={{ ...state, checkAuthState, forceRemount }}
        >
            <React.Fragment key={remountKey}>{children}</React.Fragment>
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
