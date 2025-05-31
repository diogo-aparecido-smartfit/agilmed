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
import * as S from './email-screen.style'

const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
})

export function EmailScreen() {
    const { userData } = useSelector((state: RootState) => state.onboarding)
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
        <S.Container>
            <S.ContentContainer>
                <S.HeaderContainer>
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
                </S.HeaderContainer>

                <S.FormContainer>
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
                                defaultValue={userData?.email || ''}
                                value={value}
                                error={errors.email?.message}
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
