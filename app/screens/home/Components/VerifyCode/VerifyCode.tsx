import Text from '@/components/Text/Text'
import * as S from './styles'
import OTPInput from '@/components/OtpInput/OtpInput'
import Button from '@/components/Button/Button'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useVerifyCodeController } from '@/screens/auth/verifyCode/verifyCode.controller'

export function VerifyCode() {
    const {
        handleSubmit,
        onSubmit,
        isLoading,
        control,
        formValues,
        secondsLeft,
    } = useVerifyCodeController()
    const { user } = useSelector((state: RootState) => state.auth)
    const params = useLocalSearchParams()

    const userEmail = params.email || user?.email
    const isResetPassword: boolean = params.resetPassword === 'true'

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
                    onPress={() =>
                        handleSubmit(() =>
                            onSubmit({
                                code: formValues.code,
                                document: params.email as string,
                                typed_password: isResetPassword
                                    ? (params.password as string)
                                    : undefined,
                            })
                        )()
                    }
                    isLoading={isLoading}
                    text="Verificar"
                />
                {isResetPassword && (
                    <S.RememberedPassword
                        onPress={() => router.replace('/(auth)/login')}
                    >
                        <Text
                            fontSize="base"
                            color="description"
                            textAlign="center"
                        >
                            Lembrou sua senha?{' '}
                            <Text fontWeight="700" color="black">
                                Entre agora mesmo
                            </Text>
                        </Text>
                    </S.RememberedPassword>
                )}
            </S.CodeContainer>
        </S.ContentContainer>
    )
}
