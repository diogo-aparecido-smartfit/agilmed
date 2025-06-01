import { StatusBar } from 'expo-status-bar'
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
import { Theme } from '@/config/theme'
import * as S from './edit-profile.style'
import { useSettingsController } from '../settings/settings.controller'
import EditButton from '../settings/EditButton/EditButton'
import { useTheme } from '@/hooks/useTheme'

export default function EditProfilePage() {
    const {
        control,
        formValues,
        handleSubmit,
        loading,
        onSubmit,
        imageUploadLoading,
        handleImageChange,
    } = useSettingsController()
    const { colors } = useTheme()
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <S.Container>
            <StatusBar style="dark" />
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
                    alignItems: 'center',
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
                    <Controller
                        name="full_name"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Nome completo"
                                placeholder="Digite seu nome completo"
                                defaultValue={user?.full_name}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Email"
                                placeholder="Digite seu email"
                                defaultValue={user?.email}
                                keyboardType="email-address"
                            />
                        )}
                    />
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="CPF"
                                placeholder="Digite seu CPF"
                                defaultValue={user?.cpf}
                                mask="999.999.999-99"
                                keyboardType="number-pad"
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Telefone"
                                placeholder="Digite seu telefone"
                                defaultValue={user?.phone}
                                mask="+(99) 9 9999-9999"
                                keyboardType="phone-pad"
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <BasicInput
                                onChangeText={(text) => onChange(text)}
                                label="Senha"
                                placeholder="Digite sua senha"
                                value="••••••••"
                                secureTextEntry
                            />
                        )}
                    />
                </S.FormContainer>

                <S.ButtonContainer>
                    <Button
                        disabled={loading}
                        isLoading={loading}
                        borderRadius={12}
                        text="Salvar"
                        onPress={() =>
                            handleSubmit(() => {
                                onSubmit(formValues)
                                router.back()
                            })()
                        }
                    />
                </S.ButtonContainer>
            </S.ContentContainer>
        </S.Container>
    )
}
