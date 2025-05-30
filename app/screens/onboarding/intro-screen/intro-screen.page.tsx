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
    full_name: yup
        .string()
        .required('Nome completo é obrigatório')
        .test('is-full-name', 'Digite nome e sobrenome', (value) => {
            if (!value) return false
            const names = value.trim().split(' ')
            return names.length >= 2 && names[1].length > 0
        }),
})

export function IntroScreen() {
    const dispatch = useDispatch()
    const {
        control,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const fullName = watch('full_name')

    useEffect(() => {
        if (fullName && !errors.full_name) {
            dispatch(updateOnboardingData({ full_name: fullName }))
        }
    }, [fullName, errors.full_name, dispatch])

    return (
        <Container>
            <ContentContainer>
                <LogoContainer>
                    <Text fontSize="3xl" color="mainColor" fontWeight="700">
                        AgilMed
                    </Text>
                </LogoContainer>

                <WelcomeContainer>
                    <Text fontSize="2xl" fontWeight="700" textAlign="center">
                        Bem-vindo à Demonstração
                    </Text>
                    <Text
                        fontSize="base"
                        color="description"
                        textAlign="center"
                        style={styles.marginTop}
                    >
                        Este é um ambiente de demonstração do aplicativo
                        AgilMed. Vamos começar criando um perfil rápido para
                        você explorar todas as funcionalidades.
                    </Text>
                </WelcomeContainer>

                <FormContainer>
                    <Controller
                        name="full_name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                label="Nome completo"
                                placeholder="Digite seu nome e sobrenome"
                                onChangeText={onChange}
                                value={value}
                                error={errors.full_name?.message}
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

const LogoContainer = styled.View`
    align-items: center;
    margin-bottom: 40px;
`

const WelcomeContainer = styled.View`
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
