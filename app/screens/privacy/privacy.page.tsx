import React, { useState } from 'react'
import { router } from 'expo-router'
import { Switch } from 'react-native'
import {
    ArrowLeft,
    CloudRemove,
    Eye,
    Global,
    Trash,
} from 'iconsax-react-native'
import * as S from './privacy.style'
import Text from '@/components/Text/Text'
import Button from '@/components/Button/Button'
import { Theme } from '@/config/theme'

export default function PrivacyPage() {
    const [shareHealthData, setShareHealthData] = useState(false)
    const [locationTracking, setLocationTracking] = useState(true)
    const [analyticsTracking, setAnalyticsTracking] = useState(true)

    return (
        <S.Container>
            <S.Header>
                <S.BackButton onPress={() => router.back()}>
                    <ArrowLeft size={24} color={Theme.colors.title} />
                </S.BackButton>
                <Text fontSize="lg" fontWeight="700">
                    Privacidade
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
                        <Eye
                            size={20}
                            color={Theme.colors.mainColor}
                            variant="Bold"
                        />
                        <Text fontSize="base" fontWeight="600">
                            Permissões e compartilhamento
                        </Text>
                    </S.SectionTitle>

                    <S.PrivacyItem>
                        <S.PrivacyItemLeft>
                            <S.ItemTextContainer>
                                <Text fontSize="base">
                                    Compartilhar dados de saúde
                                </Text>
                                <Text fontSize="xs" color="description">
                                    Permitir que médicos vejam seu histórico
                                    médico
                                </Text>
                            </S.ItemTextContainer>
                        </S.PrivacyItemLeft>
                        <Switch
                            value={shareHealthData}
                            onValueChange={setShareHealthData}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.PrivacyItem>

                    <S.PrivacyItem>
                        <S.PrivacyItemLeft>
                            <S.ItemTextContainer>
                                <Text fontSize="base">
                                    Rastreamento de localização
                                </Text>
                                <Text fontSize="xs" color="description">
                                    Permite encontrar clínicas próximas
                                </Text>
                            </S.ItemTextContainer>
                        </S.PrivacyItemLeft>
                        <Switch
                            value={locationTracking}
                            onValueChange={setLocationTracking}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.PrivacyItem>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>
                        <Global
                            size={20}
                            color={Theme.colors.mainColor}
                            variant="Bold"
                        />
                        <Text fontSize="base" fontWeight="600">
                            Análise e melhorias
                        </Text>
                    </S.SectionTitle>

                    <S.PrivacyItem>
                        <S.PrivacyItemLeft>
                            <S.ItemTextContainer>
                                <Text fontSize="base">
                                    Coleta de dados anônimos
                                </Text>
                                <Text fontSize="xs" color="description">
                                    Ajuda a melhorar nossos serviços
                                </Text>
                            </S.ItemTextContainer>
                        </S.PrivacyItemLeft>
                        <Switch
                            value={analyticsTracking}
                            onValueChange={setAnalyticsTracking}
                            trackColor={{
                                false: Theme.colors.lightGray,
                                true: Theme.colors.mainColor,
                            }}
                            thumbColor={Theme.colors.white}
                        />
                    </S.PrivacyItem>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>
                        <CloudRemove
                            size={20}
                            color={Theme.colors.mainColor}
                            variant="Bold"
                        />
                        <Text fontSize="base" fontWeight="600">
                            Gerenciamento de dados
                        </Text>
                    </S.SectionTitle>

                    <S.ActionButton>
                        <Text fontSize="base">Exportar meus dados</Text>
                        <Text fontSize="xs" color="description">
                            Receba um arquivo com seus dados pessoais
                        </Text>
                    </S.ActionButton>

                    <S.ActionButton>
                        <Text fontSize="base">
                            Histórico de acesso aos dados
                        </Text>
                        <Text fontSize="xs" color="description">
                            Veja quem acessou suas informações
                        </Text>
                    </S.ActionButton>
                </S.Section>

                <S.ButtonsContainer>
                    <Button
                        variant="destructive"
                        outlined
                        borderRadius={12}
                        text="Limpar histórico de dados"
                        onPress={() => {}}
                        leftIcon={
                            <Trash size={20} color={Theme.colors.error} />
                        }
                    />
                    <Button
                        variant="destructive"
                        borderRadius={12}
                        text="Solicitar exclusão de conta"
                        onPress={() => {}}
                    />
                </S.ButtonsContainer>
            </S.ContentContainer>
        </S.Container>
    )
}
