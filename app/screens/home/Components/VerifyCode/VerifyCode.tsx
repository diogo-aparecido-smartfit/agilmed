import Text from '@/components/Text/Text'
import * as S from './styles'
import OTPInput from '@/components/OtpInput/OtpInput'
import Button from '@/components/Button/Button'
import { Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useVerifyCodeController } from '@/screens/auth/verifyCode/verifyCode.controller'
import BottomSheet from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { resetCodeVerification } from '@/store/slices/auth.slice'
import { useCallback, useEffect } from 'react'
import { GestureResponderEvent } from 'react-native'

interface VerifyCodeProps {
    bottomSheetRef: React.RefObject<BottomSheetMethods | null>
}

export function VerifyCode({ bottomSheetRef }: VerifyCodeProps) {
    const dispatch = useDispatch()
    const {
        handleSubmit,
        onSubmit,
        isLoading,
        control,
        formValues,
        secondsLeft,
    } = useVerifyCodeController()
    const { user, codeVerificationSuccess } = useSelector(
        (state: RootState) => state.auth
    )

    const userEmail = user?.email || ''

    useEffect(() => {
        if (codeVerificationSuccess) {
            console.log('caiu aqui dentro')
            bottomSheetRef.current?.close()
            dispatch(resetCodeVerification())
        }
    }, [codeVerificationSuccess, bottomSheetRef])

    const handleVerifyCode = useCallback(async (e: GestureResponderEvent) => {
        console.log(formValues.code)
        await handleSubmit(() =>
            onSubmit({
                code: formValues.code,
                document: userEmail,
            })
        )()
    }, [])

    return (
        <S.ContentContainer>
            <S.TextContainer>
                <Text fontSize="2xl" textAlign="center" fontWeight="700">
                    Código de confirmação
                </Text>
                <Text fontSize="base" color="description" textAlign="center">
                    Nós enviamos um código de confirmação para o email{'\n'}
                    <Text textAlign="center">{userEmail}</Text>
                </Text>
            </S.TextContainer>
            <S.CodeContainer>
                <Controller
                    name="code"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <OTPInput
                            length={4}
                            onCodeFilled={(code) => onChange(code)}
                        />
                    )}
                />
                <Text fontSize="base" color="description" textAlign="center">
                    Nós iremos reenviar o código em{' '}
                    <Text fontWeight="700" color="mainColor">
                        {secondsLeft}s
                    </Text>
                </Text>
                <Button
                    disabled={formValues.code.length !== 4}
                    onPress={(e) => {
                        e?.preventDefault?.()
                        handleVerifyCode(e)
                    }}
                    isLoading={isLoading}
                    text="Verificar"
                />
            </S.CodeContainer>
        </S.ContentContainer>
    )
}
