import { useState } from 'react'
import { Post } from '@/services/api/api.methods'
import { showMessage } from 'react-native-flash-message'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@/store/slices/auth.slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '@/store'

interface VerifyCodeParams {
    code: string
    email: string
    typed_password?: string
    password_confirm?: string
}

interface VerifyCodeResponse {
    status: number
}

export function useVerifyCode() {
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<any>(null)

    const verifyCode = async (params: VerifyCodeParams) => {
        setIsLoading(true)
        setIsError(false)
        setError(null)

        try {
            const data = await Post<VerifyCodeResponse>('/auth/verify', params)

            if (data.status) {
                dispatch(updateUser({ ...user, isVerified: true }))

                const userString = await AsyncStorage.getItem('user')
                if (userString) {
                    const currentUser = JSON.parse(userString)
                    const updatedUser = {
                        ...currentUser,
                        ...user,
                        isVerified: true,
                    }
                    await AsyncStorage.setItem(
                        'user',
                        JSON.stringify(updatedUser)
                    )
                }

                showMessage({
                    message: 'Código verificado com sucesso!',
                    type: 'success',
                })

                setIsLoading(false)
                return true
            } else {
                showMessage({
                    message: 'Erro ao verificar código',
                    type: 'danger',
                })
                setIsLoading(false)
                return false
            }
        } catch (err: any) {
            setIsError(true)
            setError(err)

            showMessage({
                message:
                    err?.response?.data?.message ||
                    'Código inválido ou expirado',
                type: 'danger',
            })

            setIsLoading(false)
            return false
        }
    }

    return {
        verifyCode,
        isLoading,
        isError,
        error,
    }
}
