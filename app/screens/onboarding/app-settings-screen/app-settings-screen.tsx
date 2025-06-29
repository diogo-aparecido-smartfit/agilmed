import React, { useState } from 'react'
import { StyleSheet, Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setDarkMode, setNotifications } from '@/store/slices/settings.slice'
import {
    setTermsAccepted,
    setPrivacyAccepted,
} from '@/store/slices/onboarding.slice'
import Text from '@/components/Text/Text'
import * as S from './app-settings-screen.style'
import { Moon, Notification } from 'iconsax-react-native'
import { useTheme } from '@emotion/react'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { TermsModal } from '@/components/TermsModal/TermsModal'
import { PrivacyModal } from '@/components/PrivacyModal/PrivacyModal'

export function AppSettingsScreen() {
    const dispatch = useDispatch()
    const theme = useTheme()
    const { darkMode, notifications } = useSelector(
        (state: RootState) => state.settings
    )
    const { termsAccepted, privacyAccepted } = useSelector(
        (state: RootState) => state.onboarding
    )

    const [showTermsModal, setShowTermsModal] = useState(false)
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)

    const handleToggleDarkMode = (value: boolean) => {
        dispatch(setDarkMode(value))
    }

    const handleToggleNotifications = (value: boolean) => {
        dispatch(setNotifications(value))
    }

    const handleTermsAccepted = (value: boolean) => {
        dispatch(setTermsAccepted(value))
    }

    const handlePrivacyAccepted = (value: boolean) => {
        dispatch(setPrivacyAccepted(value))
    }

    return (
        <S.Container>
            <S.ContentContainer>
                <S.HeaderContainer>
                    <Text fontSize="2xl" fontWeight="700" textAlign="center">
                        Configurações do App
                    </Text>
                    <Text
                        fontSize="base"
                        color="description"
                        textAlign="center"
                        style={styles.marginTop}
                    >
                        Personalize sua experiência e ajuste as configurações de
                        acordo com suas preferências
                    </Text>
                </S.HeaderContainer>

                <S.SettingsContainer>
                    <S.Section>
                        <Text
                            fontSize="lg"
                            fontWeight="600"
                            style={{ marginBottom: 16 }}
                        >
                            Preferências
                        </Text>

                        <S.SettingItem>
                            <S.SettingItemLeft>
                                <Moon
                                    size={22}
                                    color={theme.colors.mainColor}
                                    variant="Bold"
                                />
                                <Text fontSize="base">Modo escuro</Text>
                            </S.SettingItemLeft>
                            <Switch
                                value={darkMode}
                                onValueChange={handleToggleDarkMode}
                                trackColor={{
                                    false: theme.colors.lightGray,
                                    true: theme.colors.mainColor,
                                }}
                                thumbColor={theme.colors.white}
                            />
                        </S.SettingItem>

                        <S.SettingItem>
                            <S.SettingItemLeft>
                                <Notification
                                    size={22}
                                    color={theme.colors.mainColor}
                                    variant="Bold"
                                />
                                <Text fontSize="base">Notificações</Text>
                            </S.SettingItemLeft>
                            <Switch
                                value={notifications}
                                onValueChange={handleToggleNotifications}
                                trackColor={{
                                    false: theme.colors.lightGray,
                                    true: theme.colors.mainColor,
                                }}
                                thumbColor={theme.colors.white}
                            />
                        </S.SettingItem>
                    </S.Section>

                    <S.Section>
                        <Text
                            fontSize="lg"
                            fontWeight="600"
                            style={{ marginBottom: 16 }}
                        >
                            Termos e condições
                        </Text>

                        <S.TermsItem>
                            <Checkbox
                                value={termsAccepted}
                                onValueChange={handleTermsAccepted}
                                label="Eu aceito os Termos de Uso"
                            />
                            <S.TermsLink
                                onPress={() => setShowTermsModal(true)}
                            >
                                <Text fontSize="sm" color="mainColor">
                                    Ler termos
                                </Text>
                            </S.TermsLink>
                        </S.TermsItem>

                        <S.TermsItem>
                            <Checkbox
                                value={privacyAccepted}
                                onValueChange={handlePrivacyAccepted}
                                label="Eu aceito a Política de Privacidade"
                            />
                            <S.TermsLink
                                onPress={() => setShowPrivacyModal(true)}
                            >
                                <Text fontSize="sm" color="mainColor">
                                    Ler política
                                </Text>
                            </S.TermsLink>
                        </S.TermsItem>
                    </S.Section>
                </S.SettingsContainer>
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

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 16,
    },
})
