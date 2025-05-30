import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { updateOnboardingData } from '@/store/slices/onboarding.slice'
import BasicInput from '@/components/BasicInput/BasicInput'
import Text from '@/components/Text/Text'
import styled from '@emotion/native'
import { Theme } from '@/config/theme'
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { Eye, EyeSlash } from 'iconsax-react-native'

const schema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
})

export function PasswordScreen() {
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Container>
            <ContentContainer>
                <HeaderContainer>
                    <Text fontSize="2xl" fontWeight="700" textAlign="center">
                        Crie uma senha
                    </Text>
                    <Text
                        fontSize="base"
                        color="description"
                        textAlign="center"
                        style={styles.marginTop}
                    >
                        Utilize uma senha segura para proteger sua conta
                    </Text>
                </HeaderContainer>

                <FormContainer>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.container}>
                                <BasicInput
                                    label="Senha"
                                    placeholder="Digite sua senha"
                                    secureTextEntry={!showPassword}
                                    onChangeText={onChange}
                                    value={value}
                                    error={errors.password?.message}
                                    icon={{
                                        Icon: showPassword ? EyeSlash : Eye,
                                        onPress: togglePasswordVisibility,
                                        size: 18,
                                        color: Theme.colors.lightGray,
                                    }}
                                />
                            </View>
                        )}
                    />
                </FormContainer>
            </ContentContainer>
        </Container>
    )
}

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${Theme.colors.white};
`

const ContentContainer = styled.ScrollView`
    padding: 40px 24px;
    flex-direction: column;
`

const HeaderContainer = styled.View`
    margin-bottom: 40px;
`

const FormContainer = styled.View`
    margin-top: 20px;
`

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
