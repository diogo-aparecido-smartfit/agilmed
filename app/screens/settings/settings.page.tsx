import Avatar from '@/components/Avatar/Avatar'
import * as S from './settings.style'
import Button from '@/components/Button/Button'
import Text from '@/components/Text/Text'
import EditButton from './EditButton/EditButton'
import { StatusBar } from 'expo-status-bar'
import { getFirstAndLastName } from '@/utils/utils'
import BasicInput from '@/components/BasicInput/BasicInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { logoffRequest } from '@/store/slices/auth.slice'
import { router } from 'expo-router'
import { useSettingsController } from './settings.controller'
import { Controller } from 'react-hook-form'
import {
    ArrowRight2,
    Lock,
    Notification,
    Moon,
    Security,
} from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { Switch } from 'react-native'
import { useState } from 'react'
import { PrivacyModal } from '@/components/PrivacyModal/PrivacyModal'
import { TermsModal } from '@/components/TermsModal/TermsModal'

export default function SettingsPage() {
    const {
        imageUploadLoading,
        handleClearAllData,
        handleToggleDarkMode,
        darkMode,
        showPrivacyModal,
        showTermsModal,
        handleTogglePrivacyModal,
        handleToggleTermsModal,
        setShowPrivacyModal,
        setShowTermsModal,
    } = useSettingsController()
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [notifications, setNotifications] = useState(true)

    const handleLogoff = () => {
        dispatch(logoffRequest())
        router.replace('/(auth)/login')
    }

    return (
        <S.Container>
            <S.ContentContainer
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingVertical: 40,
                    paddingHorizontal: 24,
                }}
                automaticallyAdjustKeyboardInsets
                showsVerticalScrollIndicator={false}
            >
                <S.ProfileSection>
                    <S.ProfileHeader>
                        <Text fontSize="xl" fontWeight="700">
                            Perfil
                        </Text>
                        <S.EditProfileButton
                            onPress={() =>
                                router.push('/(home)/(settings)/edit-profile')
                            }
                        >
                            <Text fontSize="sm" color="mainColor">
                                Editar
                            </Text>
                        </S.EditProfileButton>
                    </S.ProfileHeader>

                    <S.ProfileCard>
                        <S.AvatarContainer>
                            <Avatar
                                uri={user?.profile_picture_url ?? undefined}
                                isLoading={imageUploadLoading}
                                size={70}
                            />
                        </S.AvatarContainer>
                        <S.ProfileInfo>
                            <Text fontSize="lg" fontWeight="600">
                                {getFirstAndLastName(user?.full_name ?? '')}
                            </Text>
                            <Text fontSize="sm" color="description">
                                {user?.email}
                            </Text>
                            <Text fontSize="xs" color="description">
                                {user?.city} - {user?.state}
                            </Text>
                        </S.ProfileInfo>
                    </S.ProfileCard>
                </S.ProfileSection>

                <S.SettingSection>
                    <Text
                        fontSize="xl"
                        fontWeight="700"
                        style={{ marginBottom: 16 }}
                    >
                        Configurações do App
                    </Text>

                    <S.SettingItem>
                        <S.SettingItemLeft>
                            <Notification
                                size={22}
                                color={Theme.colors.mainColor}
                                variant="Bold"
                            />
                            <Text fontSize="base">Notificações</Text>
                        </S.SettingItemLeft>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.SettingItem>

                    <S.SettingItem>
                        <S.SettingItemLeft>
                            <Moon
                                size={22}
                                color={Theme.colors.mainColor}
                                variant="Bold"
                            />
                            <Text fontSize="base">Modo escuro</Text>
                        </S.SettingItemLeft>
                        <Switch
                            value={darkMode}
                            onValueChange={handleToggleDarkMode}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.SettingItem>

                    <S.SettingItem
                        onPress={() =>
                            router.push('/(home)/(settings)/security')
                        }
                    >
                        <S.SettingItemLeft>
                            <Security
                                size={22}
                                color={Theme.colors.mainColor}
                                variant="Bold"
                            />
                            <Text fontSize="base">Segurança</Text>
                        </S.SettingItemLeft>
                        <ArrowRight2
                            size={20}
                            color={Theme.colors.description}
                        />
                    </S.SettingItem>

                    <S.SettingItem
                        onPress={() =>
                            router.push('/(home)/(settings)/privacy')
                        }
                    >
                        <S.SettingItemLeft>
                            <Lock
                                size={22}
                                color={Theme.colors.mainColor}
                                variant="Bold"
                            />
                            <Text fontSize="base">Privacidade</Text>
                        </S.SettingItemLeft>
                        <ArrowRight2
                            size={20}
                            color={Theme.colors.description}
                        />
                    </S.SettingItem>
                </S.SettingSection>

                <S.SettingSection>
                    <Text
                        fontSize="xl"
                        fontWeight="700"
                        style={{ marginBottom: 16 }}
                    >
                        Sobre
                    </Text>

                    <S.AboutItem>
                        <Text fontSize="sm" color="description">
                            Versão
                        </Text>
                        <Text fontSize="sm">1.0.0</Text>
                    </S.AboutItem>

                    <S.AboutItem onPress={handleToggleTermsModal}>
                        <Text fontSize="sm" color="description">
                            Termos de uso
                        </Text>
                        <ArrowRight2
                            size={16}
                            color={Theme.colors.description}
                        />
                    </S.AboutItem>

                    <S.AboutItem onPress={handleTogglePrivacyModal}>
                        <Text fontSize="sm" color="description">
                            Política de privacidade
                        </Text>
                        <ArrowRight2
                            size={16}
                            color={Theme.colors.description}
                        />
                    </S.AboutItem>
                </S.SettingSection>

                <S.ButtonsSection>
                    <Button
                        outlined
                        borderRadius={12}
                        text="Deslogar"
                        onPress={handleLogoff}
                    />
                    <Button
                        variant="destructive"
                        borderRadius={12}
                        text="Limpar todos os dados"
                        onPress={handleClearAllData}
                    />
                </S.ButtonsSection>
            </S.ContentContainer>

            <TermsModal
                isVisible={showTermsModal}
                onClose={() => setShowTermsModal(false)}
            />

            <PrivacyModal
                isVisible={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
            />
        </S.Container>
    )
}
