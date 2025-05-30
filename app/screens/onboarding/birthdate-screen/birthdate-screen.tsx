import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { updateOnboardingData } from '@/store/slices/onboarding.slice'
import Input from '@/components/Input/Input'
import Text from '@/components/Text/Text'
import styled from '@emotion/native'
import { Theme } from '@/config/theme'
import { StyleSheet, SafeAreaView } from 'react-native'
import { parse, isValid, isAfter, format } from 'date-fns'

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
        console.log('caiu')
        console.log(birthdate)
        console.log(birthdate?.length)
        console.log(!errors.birthdate)
        console.log(errors.birthdate)
        if (birthdate && birthdate.length === 10 && !errors.birthdate) {
            const parsedDate = parse(birthdate, 'dd/MM/yyyy', new Date())

            console.log(parsedDate)
            if (isValid(parsedDate)) {
                const isoDate = format(
                    parsedDate,
                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                )
                console.log('isodate: ', isoDate)
                dispatch(updateOnboardingData({ birthdate: isoDate }))
            }
        }
    }, [birthdate, errors.birthdate, dispatch])

    return (
        <Container>
            <ContentContainer>
                <HeaderContainer>
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
                </HeaderContainer>

                <FormContainer>
                    <Controller
                        name="birthdate"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input
                                label="Data de nascimento"
                                placeholder="DD/MM/AAAA"
                                mask="99/99/9999"
                                keyboardType="numeric"
                                onChangeText={(formatted, _) =>
                                    onChange(formatted)
                                }
                                error={errors.birthdate?.message}
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
