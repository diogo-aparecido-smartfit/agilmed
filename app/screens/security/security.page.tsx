import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { Switch } from 'react-native'
import {
    ArrowLeft,
    FingerScan,
    PasswordCheck,
    ShieldTick,
    Timer1,
    UserOctagon,
} from 'iconsax-react-native'
import * as S from './security.style'
import Text from '@/components/Text/Text'
import Button from '@/components/Button/Button'
import { Theme } from '@/config/theme'

export default function SecurityPage() {
    const [biometricAuth, setBiometricAuth] = useState(true)
    const [twoFactorAuth, setTwoFactorAuth] = useState(false)
    const [autoLock, setAutoLock] = useState(true)
    const [loginNotifications, setLoginNotifications] = useState(true)

    return (
        <S.Container>
            <StatusBar style="dark" />
            <S.Header>
                <S.BackButton onPress={() => router.back()}>
                    <ArrowLeft size={24} color={Theme.colors.black} />
                </S.BackButton>
                <Text fontSize="lg" fontWeight="700">
                    Segurança
                </Text>
                <S.EmptyView />
            </S.Header>

            <S.ContentContainer
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingVertical: 24,
                    paddingHorizontal: 24,
                }}
                showsVerticalScrollIndicator={false}
            >
                <S.Section>
                    <S.SectionTitle>
                        <ShieldTick
                            size={20}
                            color={Theme.colors.mainColor}
                            variant="Bold"
                        />
                        <Text fontSize="base" fontWeight="600">
                            Autenticação
                        </Text>
                    </S.SectionTitle>

                    <S.SecurityItem>
                        <S.SecurityItemLeft>
                            <FingerScan
                                size={20}
                                color={Theme.colors.mainColor}
                            />
                            <S.ItemTextContainer>
                                <Text fontSize="base">
                                    Autenticação biométrica
                                </Text>
                                <Text fontSize="xs" color="description">
                                    Use sua digital para acessar o aplicativo
                                </Text>
                            </S.ItemTextContainer>
                        </S.SecurityItemLeft>
                        <Switch
                            value={biometricAuth}
                            onValueChange={setBiometricAuth}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.SecurityItem>

                    <S.SecurityItem>
                        <S.SecurityItemLeft>
                            <UserOctagon
                                size={20}
                                color={Theme.colors.mainColor}
                            />
                            <S.ItemTextContainer>
                                <Text fontSize="base">
                                    Autenticação em dois fatores
                                </Text>
                                <Text fontSize="xs" color="description">
                                    Adicione uma camada extra de segurança
                                </Text>
                            </S.ItemTextContainer>
                        </S.SecurityItemLeft>
                        <Switch
                            value={twoFactorAuth}
                            onValueChange={setTwoFactorAuth}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.SecurityItem>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>
                        <Timer1
                            size={20}
                            color={Theme.colors.mainColor}
                            variant="Bold"
                        />
                        <Text fontSize="base" fontWeight="600">
                            Sessão
                        </Text>
                    </S.SectionTitle>

                    <S.SecurityItem>
                        <S.SecurityItemLeft>
                            <S.ItemTextContainer>
                                <Text fontSize="base">Bloqueio automático</Text>
                                <Text fontSize="xs" color="description">
                                    Bloquear após 5 minutos de inatividade
                                </Text>
                            </S.ItemTextContainer>
                        </S.SecurityItemLeft>
                        <Switch
                            value={autoLock}
                            onValueChange={setAutoLock}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.SecurityItem>

                    <S.SecurityItem>
                        <S.SecurityItemLeft>
                            <S.ItemTextContainer>
                                <Text fontSize="base">
                                    Notificações de login
                                </Text>
                                <Text fontSize="xs" color="description">
                                    Receba alertas sobre novos acessos
                                </Text>
                            </S.ItemTextContainer>
                        </S.SecurityItemLeft>
                        <Switch
                            value={loginNotifications}
                            onValueChange={setLoginNotifications}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.SecurityItem>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>
                        <PasswordCheck
                            size={20}
                            color={Theme.colors.mainColor}
                            variant="Bold"
                        />
                        <Text fontSize="base" fontWeight="600">
                            Credenciais
                        </Text>
                    </S.SectionTitle>

                    <S.ActionButton
                        onPress={() =>
                            router.push('/(home)/(settings)/edit-profile')
                        }
                    >
                        <Text fontSize="base">Alterar senha</Text>
                        <ArrowLeft
                            size={18}
                            color={Theme.colors.mainColor}
                            style={{ transform: [{ rotate: '180deg' }] }}
                        />
                    </S.ActionButton>

                    <S.ActionButton>
                        <Text fontSize="base">Dispositivos conectados</Text>
                        <ArrowLeft
                            size={18}
                            color={Theme.colors.mainColor}
                            style={{ transform: [{ rotate: '180deg' }] }}
                        />
                    </S.ActionButton>
                </S.Section>

                <S.ButtonContainer>
                    <Button
                        variant="destructive"
                        outlined
                        borderRadius={12}
                        text="Verificar atividade suspeita"
                        onPress={() => {}}
                    />
                </S.ButtonContainer>
            </S.ContentContainer>
        </S.Container>
    )
}
