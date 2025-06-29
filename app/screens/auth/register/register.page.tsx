import Text from '@/components/Text/Text'
import * as S from './register.style'
import Button from '@/components/Button/Button'
import { Controller } from 'react-hook-form'
import { useRegisterController } from './register.controller'
import Input from '@/components/Input/Input'
import { Location, User } from 'iconsax-react-native'
import BasicInput from '@/components/BasicInput/BasicInput'
import GenericDropdown from '@/components/GenericDropdown/GenericDropdown'
import { genders, states } from '@/utils/constants'

export default function RegisterPage() {
    const {
        control,
        handleSubmit,
        onSubmit,
        isLoading,
        errors,
        filledFormValues,
    } = useRegisterController()

    return (
        <S.Container>
            <S.ContentContainer
                automaticallyAdjustKeyboardInsets
                keyboardShouldPersistTaps="handled"
            >
                <Text fontSize="2xl" textAlign="center" fontWeight="700">
                    Registrar
                </Text>
                <S.FormContainer>
                    <Controller
                        name="full_name"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(rawText) => onChange(rawText)}
                                label="Nome completo"
                                placeholder="Digite seu nome"
                                keyboardType="default"
                                autoCapitalize="words"
                            />
                        )}
                    />
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input
                                onChangeText={(_, rawText) => onChange(rawText)}
                                label="CPF"
                                placeholder="Digite seu CPF"
                                mask="999.999.999-99"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    <Controller
                        name="birthdate"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input
                                onChangeText={(_, rawText) => onChange(rawText)}
                                label="Data de nascimento"
                                placeholder="DD/MM/YYYY"
                                mask="99/99/9999"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input
                                onChangeText={(_, rawText) => onChange(rawText)}
                                label="Telefone"
                                placeholder="(99) 9 9999-9999"
                                mask="(99) 9 9999-9999"
                                keyboardType="numeric"
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                mask={undefined}
                                onChangeText={(text) => onChange(text)}
                                label="Email"
                                placeholder="Digite seu email"
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(rawText) => onChange(rawText)}
                                label="Senha"
                                placeholder="Crie sua senha"
                                secureTextEntry={true}
                            />
                        )}
                    />
                    <S.DividerContainer>
                        <S.Divider />
                        <Location color="#B2BCC9" size={16} />
                        <S.Divider />
                    </S.DividerContainer>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input
                                onChangeText={(_, rawText) => onChange(rawText)}
                                label="CEP"
                                mask="99999-999"
                                placeholder="00000-000"
                                keyboardType="number-pad"
                            />
                        )}
                    />
                    <S.RowIputContainer>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <BasicInput
                                    onChangeText={(rawText) =>
                                        onChange(rawText)
                                    }
                                    label="Cidade"
                                    placeholder="Digite sua cidade"
                                />
                            )}
                        />
                        <Controller
                            name="state"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <GenericDropdown
                                    placeholder="Selecionar"
                                    label="Estado"
                                    onSelect={(item) => onChange(item.value)}
                                    data={states}
                                />
                            )}
                        />
                    </S.RowIputContainer>
                    <S.DividerContainer>
                        <S.Divider />
                        <User color="#B2BCC9" size={16} />
                        <S.Divider />
                    </S.DividerContainer>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <GenericDropdown
                                placeholder="Selecione uma opção"
                                label="Sexo"
                                onSelect={(item) => onChange(item.value)}
                                data={genders}
                            />
                        )}
                    />
                    <S.RowIputContainer>
                        <Controller
                            name="blood_type"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <BasicInput
                                    onChangeText={(rawText) =>
                                        onChange(rawText)
                                    }
                                    label="Tipo sanguíneo"
                                    placeholder="O+"
                                />
                            )}
                        />
                        <Controller
                            name="allergies"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <BasicInput
                                    onChangeText={(rawText) =>
                                        onChange(rawText)
                                    }
                                    label="Alergias"
                                    placeholder="Dipirona..."
                                />
                            )}
                        />
                    </S.RowIputContainer>
                    <Controller
                        name="medical_history"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(rawText) => onChange(rawText)}
                                label="Histórico médico"
                                placeholder="..."
                            />
                        )}
                    />
                    <Button
                        onPress={() =>
                            handleSubmit(onSubmit, (errors) =>
                                console.error(errors)
                            )()
                        }
                        disabled={isLoading || !filledFormValues}
                        isLoading={isLoading}
                        text="Continuar"
                    />
                </S.FormContainer>
            </S.ContentContainer>
        </S.Container>
    )
}
