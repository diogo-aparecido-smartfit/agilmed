import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateOnboardingData } from '@/store/slices/onboarding.slice'
import Input from '@/components/Input/Input'
import Text from '@/components/Text/Text'
import { StyleSheet } from 'react-native'
import { parse, isValid, isAfter, format } from 'date-fns'
import { RootState } from '@/store'
import * as S from './birthdate-screen.style'

const schema = yup.object().shape({
    birthdate: yup
        .string()
        .required('Data de nascimento é obrigatória')
        .test('is-valid-date', 'Data inválida', (value) => {
            if (!value) return false

            const parsedDate = parse(value, 'dd/MM/yyyy', new Date())

            return isValid(parsedDate) && !isAfter(parsedDate, new Date())
        }),
})

export function BirthdateScreen() {
    const { userData } = useSelector((state: RootState) => state.onboarding)
    const dispatch = useDispatch()
    const {
        control,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    })

    const birthdate = watch('birthdate')

    useEffect(() => {
        if (birthdate && birthdate.length === 10 && !errors.birthdate) {
            const parsedDate = parse(birthdate, 'dd/MM/yyyy', new Date())

            if (isValid(parsedDate)) {
                const isoDate = format(
                    parsedDate,
                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                )
                dispatch(updateOnboardingData({ birthdate: isoDate }))
            }
        }
    }, [birthdate, errors.birthdate, dispatch])

    return (
        <S.Container>
            <S.ContentContainer>
                <S.HeaderContainer>
                    <Text fontSize="2xl" fontWeight="700" textAlign="center">
                        Qual é a sua data de nascimento?
                    </Text>
                    <Text
                        fontSize="base"
                        color="description"
                        textAlign="center"
                        style={styles.marginTop}
                    >
                        Usamos essa informação para personalizar sua experiência
                    </Text>
                </S.HeaderContainer>

                <S.FormContainer>
                    <Controller
                        name="birthdate"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input
                                label="Data de nascimento"
                                placeholder="DD/MM/AAAA"
                                mask="99/99/9999"
                                keyboardType="numeric"
                                defaultValue={userData?.birthdate || ''}
                                onChangeText={(formatted, _) =>
                                    onChange(formatted)
                                }
                                error={errors.birthdate?.message}
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
