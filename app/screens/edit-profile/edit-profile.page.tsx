import React from 'react'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { router } from 'expo-router'
import { RootState } from '@/store'
import Avatar from '@/components/Avatar/Avatar'
import BasicInput from '@/components/BasicInput/BasicInput'
import Button from '@/components/Button/Button'
import Text from '@/components/Text/Text'
import { ArrowLeft } from 'iconsax-react-native'
import * as S from './edit-profile.style'
import { useEditProfileController } from './edit-profile.controller'
import EditButton from '../settings/EditButton/EditButton'
import { useTheme } from '@/hooks/useTheme'
import GenericDropdown from '@/components/GenericDropdown/GenericDropdown'
import { genders, states } from '@/utils/constants'
import { IUpdateUserData } from '@/types/types'

export default function EditProfilePage() {
    const {
        control,
        formValues,
        handleSubmit,
        loading,
        onSubmit,
        imageUploadLoading,
        handleImageChange,
        errors,
    } = useEditProfileController()
    const { colors } = useTheme()
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <S.Container>
            <S.Header>
                <S.BackButton onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.title} />
                </S.BackButton>
                <Text fontSize="lg" fontWeight="700">
                    Editar Perfil
                </Text>
                <S.EmptyView />
            </S.Header>

            <S.ContentContainer
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingVertical: 20,
                    paddingHorizontal: 24,
                }}
                automaticallyAdjustKeyboardInsets
                showsVerticalScrollIndicator={false}
            >
                <S.AvatarContainer>
                    <Avatar
                        uri={user?.profile_picture_url ?? undefined}
                        isLoading={imageUploadLoading}
                        size={120}
                    />
                    <EditButton onChange={handleImageChange} />
                </S.AvatarContainer>

                <S.FormContainer>
                    <S.SectionTitle>
                        <Text fontSize="lg" fontWeight="600">
                            Informações Pessoais
                        </Text>
                    </S.SectionTitle>

                    <Controller
                        name="full_name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Nome completo"
                                placeholder="Digite seu nome completo"
                                value={value ?? undefined}
                                error={errors.full_name?.message}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Email"
                                placeholder="Digite seu email"
                                value={value ?? undefined}
                                keyboardType="email-address"
                                error={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name="phone"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Telefone"
                                placeholder="Digite seu telefone"
                                value={value ?? undefined}
                                mask="(99) 9 9999-9999"
                                keyboardType="phone-pad"
                                error={errors.phone?.message}
                            />
                        )}
                    />

                    <S.SectionTitle>
                        <Text fontSize="lg" fontWeight="600">
                            Endereço
                        </Text>
                    </S.SectionTitle>

                    <Controller
                        name="address"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Endereço"
                                placeholder="Digite seu endereço"
                                value={value ?? undefined}
                                error={errors.address?.message}
                            />
                        )}
                    />

                    <S.RowContainer>
                        <S.RowItem>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <BasicInput
                                        onChangeText={(text) => onChange(text)}
                                        label="Cidade"
                                        placeholder="Digite sua cidade"
                                        value={value ?? undefined}
                                        error={errors.city?.message}
                                    />
                                )}
                            />
                        </S.RowItem>

                        <S.RowItem>
                            <Controller
                                name="state"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <GenericDropdown
                                        placeholder="Selecionar"
                                        label="Estado"
                                        onSelect={(item) =>
                                            onChange(item.value)
                                        }
                                        data={states}
                                        error={errors.state?.message}
                                    />
                                )}
                            />
                        </S.RowItem>
                    </S.RowContainer>

                    <S.SectionTitle>
                        <Text fontSize="lg" fontWeight="600">
                            Informações Médicas
                        </Text>
                    </S.SectionTitle>

                    <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <GenericDropdown
                                placeholder="Selecione uma opção"
                                label="Sexo"
                                onSelect={(item) => onChange(item.value)}
                                data={genders}
                                error={errors.gender?.message}
                            />
                        )}
                    />

                    <Controller
                        name="allergies"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Alergias"
                                placeholder="Exemplo: Dipirona, AAS..."
                                value={value ?? undefined}
                                error={errors.allergies?.message}
                            />
                        )}
                    />

                    <Controller
                        name="medical_history"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Histórico médico"
                                placeholder="Descreva seu histórico médico"
                                value={value ?? undefined}
                                multiline
                                numberOfLines={4}
                                error={errors.medical_history?.message}
                            />
                        )}
                    />

                    <S.SectionTitle>
                        <Text fontSize="lg" fontWeight="600">
                            Segurança
                        </Text>
                    </S.SectionTitle>

                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Nova senha"
                                placeholder="Digite para alterar sua senha"
                                value={value ?? undefined}
                                secureTextEntry
                                error={errors.password?.message}
                            />
                        )}
                    />
                </S.FormContainer>

                <S.ButtonContainer>
                    <Button
                        disabled={loading}
                        isLoading={loading}
                        borderRadius={12}
                        text="Salvar alterações"
                        onPress={handleSubmit((data) => {
                            onSubmit(data as IUpdateUserData)
                            router.back()
                        })}
                    />
                </S.ButtonContainer>
            </S.ContentContainer>
        </S.Container>
    )
}
