import React, { forwardRef, useEffect } from 'react'
import { Linking, StyleSheet, View } from 'react-native'
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet'
import * as S from './style'
import Text from '@/components/Text/Text'
import { useTheme } from '@emotion/react'
import {
    Headphone,
    Call,
    ArrowRight2,
    Hospital,
    Shield,
    MessageText1,
    InfoCircle,
} from 'iconsax-react-native'
import { router } from 'expo-router'

interface SOSModalProps {
    isVisible: boolean
    onClose: () => void
}

const EMERGENCY_CONTACTS = [
    {
        id: 'samu',
        name: 'SAMU',
        description: 'Serviço de Atendimento Móvel de Urgência',
        number: '192',
        icon: Hospital,
    },
    {
        id: 'bombeiros',
        name: 'Bombeiros',
        description: 'Corpo de Bombeiros',
        number: '193',
        icon: InfoCircle,
    },
    {
        id: 'policia',
        name: 'Polícia',
        description: 'Polícia Militar',
        number: '190',
        icon: Shield,
    },
    {
        id: 'defesa-civil',
        name: 'Defesa Civil',
        description: 'Defesa Civil Nacional',
        number: '199',
        icon: InfoCircle,
    },
]

export const SOSModal = forwardRef<BottomSheet, SOSModalProps>(
    ({ isVisible, onClose }, ref) => {
        const theme = useTheme()

        const handleCall = (number: string) => {
            Linking.openURL(`tel:${number}`)
        }

        const handleChatbot = () => {
            onClose()
            router.push('/(home)/(chat)/chat')
        }

        const handleSheetChanges = (index: number) => {
            if (index === -1) {
                onClose()
            }
        }

        return (
            <BottomSheet
                ref={ref}
                index={0}
                snapPoints={['70%']}
                enablePanDownToClose
                onClose={onClose}
                onChange={handleSheetChanges}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        pressBehavior="close"
                    />
                )}
                handleIndicatorStyle={{
                    backgroundColor: theme.colors.lightGray,
                    width: 40,
                }}
                backgroundStyle={{
                    backgroundColor: theme.colors.background,
                }}
            >
                <BottomSheetView style={styles.container}>
                    <View style={styles.header}>
                        <Text fontSize="xl" fontWeight="700">
                            Emergência SOS
                        </Text>
                        <Text
                            fontSize="sm"
                            color="description"
                            style={styles.description}
                        >
                            Use os contatos abaixo em caso de emergência ou
                            solicite ajuda pelo chat
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <Call
                                size={20}
                                color={theme.colors.mainColor}
                                variant="Bold"
                            />
                            <Text fontSize="base" fontWeight="600">
                                Números de Emergência
                            </Text>
                        </View>

                        <View style={styles.emergencyList}>
                            {EMERGENCY_CONTACTS.map((contact) => (
                                <S.EmergencyItem
                                    key={contact.id}
                                    onPress={() => handleCall(contact.number)}
                                >
                                    <S.EmergencyIconContainer>
                                        <contact.icon
                                            size={24}
                                            color={theme.colors.error}
                                            variant="Bold"
                                        />
                                    </S.EmergencyIconContainer>
                                    <S.EmergencyInfo>
                                        <View>
                                            <Text
                                                fontSize="base"
                                                fontWeight="600"
                                            >
                                                {contact.name} -{' '}
                                                {contact.number}
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                color="description"
                                            >
                                                {contact.description}
                                            </Text>
                                        </View>
                                        <Call
                                            size={22}
                                            color={theme.colors.mainColor}
                                            variant="Bold"
                                        />
                                    </S.EmergencyInfo>
                                </S.EmergencyItem>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <MessageText1
                                size={20}
                                color={theme.colors.mainColor}
                                variant="Bold"
                            />
                            <Text fontSize="base" fontWeight="600">
                                Assistência Virtual
                            </Text>
                        </View>

                        <S.ChatbotOption onPress={handleChatbot}>
                            <S.ChatbotIconContainer>
                                <Headphone
                                    size={24}
                                    color={theme.colors.mainColor}
                                    variant="Bold"
                                />
                            </S.ChatbotIconContainer>
                            <S.EmergencyInfo>
                                <View>
                                    <Text fontSize="base" fontWeight="600">
                                        Assistente AgilMed
                                    </Text>
                                    <Text fontSize="xs" color="description">
                                        Orientações e primeiros socorros
                                    </Text>
                                </View>
                                <ArrowRight2
                                    size={22}
                                    color={theme.colors.mainColor}
                                />
                            </S.EmergencyInfo>
                        </S.ChatbotOption>
                    </View>

                    <View style={styles.disclaimer}>
                        <Text
                            fontSize="xs"
                            color="description"
                            textAlign="center"
                        >
                            Em casos de emergência real, recomendamos entrar em
                            contato diretamente com os serviços de emergência.
                        </Text>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        )
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    description: {
        marginTop: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    emergencyList: {
        gap: 12,
    },
    disclaimer: {
        padding: 16,
        marginTop: 'auto',
    },
})
