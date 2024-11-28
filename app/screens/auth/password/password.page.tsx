import Text from '@/components/Text/Text'
import * as S from './password.style'
import Button from '@/components/Button/Button'
import { Controller } from 'react-hook-form'
import { usePasswordController } from './password.controller'
import { router, useLocalSearchParams } from 'expo-router'
import { Eye, EyeSlash } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { StatusBar } from 'expo-status-bar'
import BasicInput from '@/components/BasicInput/BasicInput'

export default function PasswordPage() {
    const {
        control,
        showPassword,
        togglePasswordVisibility,
        isLoading,
        handleSubmit,
        onSubmit,
        formValues,
    } = usePasswordController()
    const params = useLocalSearchParams()

    console.log(showPassword)

    return (
        <S.Container>
            <StatusBar style="dark" />
            <S.ContentContainer keyboardShouldPersistTaps="always">
                <Text fontSize="2xl" textAlign="center" fontWeight="700">
                    Entrar
                </Text>
                <S.FormContainer>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Senha"
                                placeholder="Digite sua senha"
                                keyboardType="default"
                                secureTextEntry={true}
                                // icon={{
                                //     Icon: showPassword ? EyeSlash : Eye,
                                //     color: Theme.colors.description,
                                //     onPress: togglePasswordVisibility,
                                // }}
                            />
                        )}
                    />
                    <S.ForgetPassword
                        onPress={() =>
                            router.push({
                                pathname: '/(auth)/resetPassword',
                                params: {
                                    document: params.document,
                                },
                            })
                        }
                    >
                        <Text>Esqueceu sua senha?</Text>
                    </S.ForgetPassword>
                    <Button
                        isLoading={isLoading}
                        disabled={formValues.password.length < 1}
                        onPress={() =>
                            handleSubmit(() =>
                                onSubmit({
                                    document: params.document as string,
                                    password: formValues.password,
                                })
                            )()
                        }
                        text="Continuar"
                    />
                </S.FormContainer>
            </S.ContentContainer>
        </S.Container>
    )
}
