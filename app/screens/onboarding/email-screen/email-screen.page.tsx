import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { updateOnboardingData } from '@/store/slices/onboarding.slice'
import BasicInput from '@/components/BasicInput/BasicInput'
import Text from '@/components/Text/Text'
import styled from '@emotion/native'
import { Theme } from '@/config/theme'
import { StyleSheet, SafeAreaView } from 'react-native'

const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
})

export function EmailScreen() {
    const dispatch = useDispatch()
    const {
        control,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const email = watch('email')

    useEffect(() => {
        if (email && !errors.email) {
            dispatch(updateOnboardingData({ email }))
        }
    }, [email, errors.email, dispatch])

    return (
        <Container>
            <ContentContainer>
                <HeaderContainer>
                    <Text fontSize="2xl" fontWeight="700" textAlign="center">
                        Qual é o seu email?
                    </Text>
                    <Text
                        fontSize="base"
                        color="description"
                        textAlign="center"
                        style={styles.marginTop}
                    >
                        Usamos seu email para acesso à conta e comunicações
                        importantes
                    </Text>
                </HeaderContainer>

                <FormContainer>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                label="Email"
                                placeholder="seu.email@exemplo.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                error={errors.email?.message}
                            />
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
})
