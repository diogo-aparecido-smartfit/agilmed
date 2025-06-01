import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateOnboardingData } from '@/store/slices/onboarding.slice'
import BasicInput from '@/components/BasicInput/BasicInput'
import Text from '@/components/Text/Text'
import { StyleSheet } from 'react-native'
import { RootState } from '@/store'
import * as S from './intro-screen.style'
import { schema } from './intro-screen.schema'

export function IntroScreen() {
    const dispatch = useDispatch()
    const { userData } = useSelector((state: RootState) => state.onboarding)
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
        <S.Container>
            <S.ContentContainer>
                <S.LogoContainer>
                    <Text fontSize="3xl" color="mainColor" fontWeight="700">
                        AgilMed
                    </Text>
                </S.LogoContainer>

                <S.WelcomeContainer>
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
                </S.WelcomeContainer>

                <S.FormContainer>
                    <Controller
                        name="full_name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                label="Nome completo"
                                placeholder="Digite seu nome e sobrenome"
                                onChangeText={onChange}
                                value={value}
                                defaultValue={userData?.full_name || ''}
                                error={errors.full_name?.message}
                            />
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
})
