import React, { useCallback } from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import Text from '@/components/Text/Text'
import * as S from './doctor-details.style'
import { useDoctorDetailsController } from './doctor-details.controller'
import { useTheme } from '@/hooks/useTheme'
import {
    Call,
    Sms,
    Calendar1,
    Location,
    ProfileCircle,
    Clock,
    Calendar,
} from 'iconsax-react-native'
import BottomSheet, {
    BottomSheetView,
    BottomSheetScrollView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import Avatar from '@/components/Avatar/Avatar'
import Header from './components/header/header.component'

export default function DoctorDetailsPage() {
    const { colors } = useTheme()
    const {
        doctor,
        isLoading,
        error,
        handleBackPress,
        handleCallDoctor,
        handleSendEmail,
        handleScheduleAppointment,
        handleOpenMaps,
        bottomSheetRef,
        snapPoints,
    } = useDoctorDetailsController()

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.7}
            />
        ),
        []
    )

    if (isLoading) {
        return (
            <S.LoadingContainer>
                <ActivityIndicator size="large" color={colors.mainColor} />
                <Text color="description" style={{ marginTop: 16 }}>
                    Carregando detalhes do médico...
                </Text>
            </S.LoadingContainer>
        )
    }

    if (error || !doctor) {
        return (
            <S.ErrorContainer>
                <Text
                    color="error"
                    fontSize="lg"
                    fontWeight="600"
                    textAlign="center"
                >
                    Não foi possível carregar os detalhes do médico
                </Text>
                <TouchableOpacity onPress={handleBackPress}>
                    <Text color="mainColor" style={{ marginTop: 16 }}>
                        Voltar
                    </Text>
                </TouchableOpacity>
            </S.ErrorContainer>
        )
    }

    return (
        <S.Container
            source={{
                uri:
                    doctor.profile_picture_url ||
                    'https://images.unsplash.com/photo-1631507623104-aa66944677aa?q=80&w=2787&auto=format&fit=crop',
            }}
            imageStyle={{
                width: '100%',
                height: '45%',
                opacity: 0.8,
            }}
        >
            <Header onBackPress={handleBackPress} />

            <BottomSheet
                backgroundStyle={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: 32,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.lightDescription,
                    width: 60,
                }}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={false}
                index={0}
            >
                <BottomSheetScrollView contentContainerStyle={{ padding: 24 }}>
                    <S.Content>
                        <S.DoctorHeader>
                            <Avatar
                                size={80}
                                uri={doctor.profile_picture_url || undefined}
                            />
                            <S.DoctorInfo>
                                <Text fontSize="xl" fontWeight="700">
                                    {doctor.user.full_name}
                                </Text>
                                <S.SpecialtyBadge>
                                    <Text
                                        fontSize="xs"
                                        fontWeight="500"
                                        color="mainColor"
                                    >
                                        {doctor.specialty}
                                    </Text>
                                </S.SpecialtyBadge>
                            </S.DoctorInfo>
                        </S.DoctorHeader>

                        <S.ActionButtons>
                            <S.ActionButton onPress={handleCallDoctor}>
                                <Call
                                    size={20}
                                    color={colors.mainColor}
                                    variant="Bold"
                                />
                                <Text fontWeight="500">Ligar</Text>
                            </S.ActionButton>
                            <S.ActionButton onPress={handleSendEmail}>
                                <Sms
                                    size={20}
                                    color={colors.mainColor}
                                    variant="Bold"
                                />
                                <Text fontWeight="500">Email</Text>
                            </S.ActionButton>
                        </S.ActionButtons>

                        <S.MainActionButton onPress={handleScheduleAppointment}>
                            <Text color="white" fontWeight="600">
                                Agendar Consulta
                            </Text>
                        </S.MainActionButton>

                        <S.SectionTitle>
                            <ProfileCircle
                                size={20}
                                color={colors.mainColor}
                                variant="Bold"
                            />
                            <Text fontSize="lg" fontWeight="600">
                                Informações
                            </Text>
                        </S.SectionTitle>

                        <S.InfoCard>
                            <S.InfoItem>
                                <Calendar1
                                    size={18}
                                    color={colors.mainColor}
                                    variant="Bold"
                                />
                                <Text>CRM: {doctor.crm}</Text>
                            </S.InfoItem>

                            <S.InfoItem>
                                <ProfileCircle
                                    size={18}
                                    color={colors.mainColor}
                                    variant="Bold"
                                />
                                <Text>
                                    Gênero:{' '}
                                    {doctor.gender === 'masculino'
                                        ? 'Masculino'
                                        : 'Feminino'}
                                </Text>
                            </S.InfoItem>
                        </S.InfoCard>

                        <S.SectionTitle>
                            <Location
                                size={20}
                                color={colors.mainColor}
                                variant="Bold"
                            />
                            <Text fontSize="lg" fontWeight="600">
                                Endereço
                            </Text>
                        </S.SectionTitle>

                        <S.AddressCard onPress={handleOpenMaps}>
                            <Text>
                                {doctor.address}, {doctor.city} - {doctor.state}
                            </Text>
                            <Text
                                fontSize="xs"
                                color="mainColor"
                                fontWeight="500"
                            >
                                Abrir no mapa
                            </Text>
                        </S.AddressCard>

                        {doctor.bio && (
                            <>
                                <S.SectionTitle>
                                    <ProfileCircle
                                        size={20}
                                        color={colors.mainColor}
                                        variant="Bold"
                                    />
                                    <Text fontSize="lg" fontWeight="600">
                                        Sobre o Médico
                                    </Text>
                                </S.SectionTitle>

                                <S.BioSection>
                                    <Text color="description">
                                        {doctor.bio}
                                    </Text>
                                </S.BioSection>
                            </>
                        )}

                        {doctor.available_hours && (
                            <>
                                <S.SectionTitle>
                                    <Clock
                                        size={20}
                                        color={colors.mainColor}
                                        variant="Bold"
                                    />
                                    <Text fontSize="lg" fontWeight="600">
                                        Horários Disponíveis
                                    </Text>
                                </S.SectionTitle>

                                <S.ScheduleSection>
                                    <S.InfoCard>
                                        <S.DaySchedule>
                                            <Text fontWeight="500">
                                                Segunda-feira
                                            </Text>
                                            <Text color="description">
                                                08:00 - 17:00
                                            </Text>
                                        </S.DaySchedule>
                                        <S.Divider />
                                        <S.DaySchedule>
                                            <Text fontWeight="500">
                                                Terça-feira
                                            </Text>
                                            <Text color="description">
                                                08:00 - 17:00
                                            </Text>
                                        </S.DaySchedule>
                                        <S.Divider />
                                        <S.DaySchedule>
                                            <Text fontWeight="500">
                                                Quarta-feira
                                            </Text>
                                            <Text color="description">
                                                08:00 - 17:00
                                            </Text>
                                        </S.DaySchedule>
                                        <S.Divider />
                                        <S.DaySchedule>
                                            <Text fontWeight="500">
                                                Quinta-feira
                                            </Text>
                                            <Text color="description">
                                                08:00 - 17:00
                                            </Text>
                                        </S.DaySchedule>
                                        <S.Divider />
                                        <S.DaySchedule>
                                            <Text fontWeight="500">
                                                Sexta-feira
                                            </Text>
                                            <Text color="description">
                                                08:00 - 17:00
                                            </Text>
                                        </S.DaySchedule>
                                    </S.InfoCard>
                                </S.ScheduleSection>
                            </>
                        )}
                    </S.Content>
                </BottomSheetScrollView>
            </BottomSheet>
        </S.Container>
    )
}
