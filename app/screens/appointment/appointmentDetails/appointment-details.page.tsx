import React, { useCallback } from 'react'
import Text from '@/components/Text/Text'
import * as S from '@/screens/appointment/appointmentDetails/appointment-details.style'
import Header from './Components/Header/Header'
import {
    Calendar1,
    Clock,
    Location,
    Note,
    Clipboard,
    Profile2User,
    Sms,
    Call,
} from 'iconsax-react-native'
import { Marker } from 'react-native-maps'
import { UseAppointmentDetailsController } from './appointment-details.controller'
import BottomSheet, {
    BottomSheetView,
    BottomSheetScrollView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import Avatar from '@/components/Avatar/Avatar'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function AppointmentDetailsPage() {
    const theme = useTheme()
    const { darkMode } = useSelector((state: RootState) => state.settings)

    const {
        appointment,
        isLoading,
        handleOpenOnMaps,
        mapRef,
        region,
        bottomSheetRef,
        snapPoints,
        formatAppointmentDate,
        formatAppointmentTime,
        getStatusColor,
        getStatusLabel,
        handleBackPress,
    } = UseAppointmentDetailsController()

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.7}
                pressBehavior={'none'}
            />
        ),
        []
    )

    if (isLoading) {
        return (
            <S.LoadingContainer>
                <ActivityIndicator
                    size="large"
                    color={theme.colors.mainColor}
                />
                <Text color="description" style={{ marginTop: 16 }}>
                    Carregando detalhes da consulta...
                </Text>
            </S.LoadingContainer>
        )
    }

    if (!appointment) {
        return (
            <S.ErrorContainer>
                <Text
                    color="error"
                    fontSize="lg"
                    fontWeight="600"
                    textAlign="center"
                >
                    Não foi possível carregar os detalhes da consulta
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
                    appointment.doctor.user.profile_picture_url ||
                    'https://images.unsplash.com/photo-1631507623104-aa66944677aa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            imageStyle={{
                width: '100%',
                height: '45%',
                opacity: 0.8,
            }}
        >
            <Header />
            <BottomSheet
                backgroundStyle={{
                    backgroundColor: theme.colors.cardBackground,
                    borderRadius: 32,
                }}
                handleIndicatorStyle={{
                    backgroundColor: theme.colors.lightDescription,
                    width: 60,
                }}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                backdropComponent={renderBackdrop}
                index={0}
            >
                <BottomSheetScrollView contentContainerStyle={{ padding: 24 }}>
                    <S.StatusBadge
                        style={{
                            backgroundColor: getStatusColor(appointment.status),
                        }}
                    >
                        <Text color="white" fontSize="xs" fontWeight="600">
                            {getStatusLabel(appointment.status)}
                        </Text>
                    </S.StatusBadge>

                    <S.Header>
                        <S.DoctorInfoSection>
                            <Avatar
                                size={60}
                                uri={
                                    appointment.doctor.user
                                        .profile_picture_url || undefined
                                }
                            />
                            <S.InformationContainer>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    fontWeight="700"
                                    fontSize="xl"
                                >
                                    {appointment.doctor_name}
                                </Text>
                                <Text fontWeight="400" color="description">
                                    {appointment.doctor.specialty}
                                </Text>
                            </S.InformationContainer>
                        </S.DoctorInfoSection>

                        <S.ActionsContainer>
                            <S.ActionButton>
                                <Call
                                    size={22}
                                    color={theme.colors.mainColor}
                                    variant="Bold"
                                />
                            </S.ActionButton>
                            <S.ActionButton>
                                <Sms
                                    size={22}
                                    color={theme.colors.mainColor}
                                    variant="Bold"
                                />
                            </S.ActionButton>
                        </S.ActionsContainer>
                    </S.Header>

                    <S.DividerContainer>
                        <S.Divider />
                        <Clipboard
                            size={14}
                            color={theme.colors.inputColor}
                            variant="Bold"
                        />
                        <S.Divider />
                    </S.DividerContainer>

                    <S.Content>
                        <S.SectionTitle>
                            <Text fontWeight="600" fontSize="lg">
                                Detalhes do agendamento
                            </Text>
                        </S.SectionTitle>

                        <S.InfoCard>
                            <S.InfoItem>
                                <Calendar1
                                    size={18}
                                    color={theme.colors.mainColor}
                                    variant="Bold"
                                />
                                <Text fontWeight="500">
                                    {formatAppointmentDate(
                                        appointment.appointment_date
                                    )}
                                </Text>
                            </S.InfoItem>

                            <S.InfoItem>
                                <Clock
                                    size={18}
                                    color={theme.colors.mainColor}
                                    variant="Bold"
                                />
                                <Text fontWeight="500">
                                    {formatAppointmentTime(
                                        appointment.appointment_date
                                    )}
                                </Text>
                            </S.InfoItem>

                            <S.InfoItem>
                                <Profile2User
                                    size={18}
                                    color={theme.colors.mainColor}
                                    variant="Bold"
                                />
                                <Text fontWeight="500">
                                    CRM: {appointment.doctor.crm}
                                </Text>
                            </S.InfoItem>
                        </S.InfoCard>

                        <S.ReasonSection>
                            <Text fontWeight="600" fontSize="base">
                                Motivo da consulta
                            </Text>
                            <S.ReasonCard>
                                <Note
                                    size={18}
                                    color={theme.colors.mainColor}
                                    style={{ marginRight: 8 }}
                                />
                                <Text color="description">
                                    {appointment.reason}
                                </Text>
                            </S.ReasonCard>

                            {appointment.notes && (
                                <>
                                    <Text
                                        fontWeight="600"
                                        fontSize="base"
                                        style={{ marginTop: 16 }}
                                    >
                                        Observações
                                    </Text>
                                    <S.NotesCard>
                                        <Text color="description">
                                            {appointment.notes}
                                        </Text>
                                    </S.NotesCard>
                                </>
                            )}
                        </S.ReasonSection>

                        <S.AddressSection>
                            <Text fontWeight="600" fontSize="base">
                                Endereço da Clínica
                            </Text>
                            <S.AddressCard>
                                <S.AddressInfo>
                                    <Location
                                        size={18}
                                        color={theme.colors.mainColor}
                                        variant="Bold"
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text color="description">
                                        {appointment.doctor.address},{' '}
                                        {appointment.doctor.city} -{' '}
                                        {appointment.doctor.state}
                                    </Text>
                                </S.AddressInfo>

                                <S.CustomMap
                                    onPress={handleOpenOnMaps}
                                    ref={mapRef}
                                    initialRegion={region}
                                    customMapStyle={
                                        darkMode
                                            ? S.darkMapStyle
                                            : S.customMapStyle
                                    }
                                >
                                    <Marker
                                        title={appointment.doctor_name}
                                        description={appointment.doctor.address}
                                        coordinate={region}
                                    />
                                </S.CustomMap>
                            </S.AddressCard>
                        </S.AddressSection>
                    </S.Content>
                </BottomSheetScrollView>
            </BottomSheet>
        </S.Container>
    )
}
