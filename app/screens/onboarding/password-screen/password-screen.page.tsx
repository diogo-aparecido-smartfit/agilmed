import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateOnboardingData } from '@/store/slices/onboarding.slice'
import BasicInput from '@/components/BasicInput/BasicInput'
import Text from '@/components/Text/Text'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Eye, EyeSlash } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { RootState } from '@/store'
import * as S from './password-screen.style'

const schema = yup.object().shape({
    password: yup
        .string()
        .required('Senha é obrigatória')
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export function PasswordScreen() {
    const { userData } = useSelector((state: RootState) => state.onboarding)
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const {
        control,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const password = watch('password')

    useEffect(() => {
        if (password && !errors.password) {
            dispatch(updateOnboardingData({ password }))
        }
    }, [password, errors.password, dispatch])

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <S.Container>
            <S.ContentContainer>
                <S.HeaderContainer>
                    <Text fontSize="2xl" fontWeight="700" textAlign="center">
                        Crie uma senha
                    </Text>
                    <Text
                        fontSize="base"
                        color="description"
                        textAlign="center"
                        style={styles.marginTop}
                    >
                        Use uma senha segura para proteger sua conta
                    </Text>
                </S.HeaderContainer>

                <S.FormContainer>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TouchableOpacity
                                style={styles.container}
                                activeOpacity={1}
                            >
                                <BasicInput
                                    label="Senha"
                                    placeholder="Digite sua senha"
                                    secureTextEntry={!showPassword}
                                    onChangeText={onChange}
                                    value={value}
                                    defaultValue={userData?.password || ''}
                                    error={errors.password?.message}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={toggleShowPassword}
                                >
                                    {showPassword ? (
                                        <EyeSlash
                                            size={20}
                                            color={Theme.colors.description}
                                        />
                                    ) : (
                                        <Eye
                                            size={20}
                                            color={Theme.colors.description}
                                        />
                                    )}
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                </S.FormContainer>
            </S.ContentContainer>
        </S.Container>
    )
}

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 16,
    },
    container: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 38,
        zIndex: 1,
    },
})
