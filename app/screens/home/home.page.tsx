import { ptBR } from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'
import * as S from '@/screens/home/home.style'
import { useCallback } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import { router } from 'expo-router'
import NextAppointment from './Components/NextAppointment/NextAppointment'
import { Calendar1, Hospital, Link2, Sun } from 'iconsax-react-native'
import FastAction from './Components/FastAction/FastAction'
import Text from '@/components/Text/Text'
import { getFirstAndLastName } from '@/utils/utils'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { useHomeController } from './home.controller'
import { Platform, RefreshControl, View } from 'react-native'
import { Theme } from '@/config/theme'
import NearPlace from './Components/NearPlace/NearPlace'
import { useAppointments } from '@/hooks/api/useAppointments'

export default function HomePage() {
    const {
        appointments,
        error: appointmentsError,
        loading: loadingAppointments,
        refetch,
    } = useAppointments()
    const { units, loading, error } = useHomeController()
    const { user } = useSelector((state: RootState) => state.auth)

    const handleNavigateToProfile = useCallback(() => {
        router.navigate('/(home)/(settings)/settings')
    }, [])

    return (
        <S.Container>
            <S.ContentContainer
                refreshControl={
                    <RefreshControl
                        refreshing={loadingAppointments || loading}
                        onRefresh={refetch}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 24,
                    flexDirection: 'column',
                    paddingBottom: 40,
                    paddingHorizontal: 24,
                    paddingTop: Platform.OS === 'android' ? 50 : 90,
                }}
            >
                <S.Header>
                    <S.WelcomeWrapper>
                        <S.Title>Olá</S.Title>
                        <S.Username>
                            {getFirstAndLastName(user?.full_name ?? '')}
                        </S.Username>
                    </S.WelcomeWrapper>
                    <Avatar
                        uri={user?.profile_picture_url ?? undefined}
                        onPress={handleNavigateToProfile}
                    />
                </S.Header>
                <S.NextAppointmentsContainer>
                    <Text fontWeight="600">Agendamentos futuros 🚀</Text>
                    <S.NextAppointmentsWrapper
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={{
                            gap: 16,
                            flexDirection: 'row',
                            paddingHorizontal: 24,
                            overflow: 'visible',
                        }}
                    >
                        {appointments.length === 0 ? (
                            <View style={{ flex: 1, maxWidth: '90%' }}>
                                <Text color="description">
                                    Você ainda não possui agendamentos futuros.
                                </Text>
                            </View>
                        ) : (
                            appointments.map((appointment) => (
                                <NextAppointment
                                    key={appointment.id}
                                    date={format(
                                        new Date(appointment.appointment_date),
                                        "EEEE, dd 'de' MMMM",
                                        { locale: ptBR }
                                    )}
                                    doctorName={appointment.doctor_name}
                                    doctorType="Clínico Geral"
                                    startAt={format(
                                        new Date(appointment.appointment_date),
                                        'HH:mm'
                                    )}
                                    endAt={format(
                                        new Date(appointment.appointment_date),
                                        'HH:mm'
                                    )}
                                />
                            ))
                        )}
                    </S.NextAppointmentsWrapper>
                </S.NextAppointmentsContainer>
                <S.FastActionContainer>
                    <FastAction
                        onPress={() =>
                            showMessage({
                                message:
                                    'Desculpe, mas esta ação ainda não foi implementada.',
                                type: 'warning',
                            })
                        }
                        Icon={Sun}
                        text="Covid 19"
                    />
                    <FastAction
                        onPress={() =>
                            router.push('/(home)/(appointments)/appointments')
                        }
                        Icon={Calendar1}
                        text="Consultas"
                    />
                    <FastAction
                        onPress={() =>
                            showMessage({
                                message:
                                    'Desculpe, mas esta ação ainda não foi implementada.',
                                type: 'warning',
                            })
                        }
                        Icon={Link2}
                        text="Remédios"
                    />
                    <FastAction
                        onPress={() => router.push('/(places)/places-list')}
                        Icon={Hospital}
                        text="Unidades"
                    />
                </S.FastActionContainer>
                <S.NearDoctorsContainer>
                    <View>
                        <Text fontWeight="600">
                            {loading
                                ? 'Carregando unidades médicas próximas de você 📍'
                                : 'Unidades médicas próximas de você 📍'}
                        </Text>
                        <Text fontSize="sm" color="description">
                            Clique na unidade desejada para mais detalhes
                        </Text>
                    </View>
                    {units.map((unit) => (
                        <NearPlace
                            id={unit.id}
                            key={unit.id}
                            name={unit.name}
                            type={unit.category || ''}
                            distance={`${((unit?.dist || 0) / 1000).toFixed(
                                1
                            )} km`}
                            openAt="08:00"
                            rating="4,5 (200 reviews)"
                        />
                    ))}
                </S.NearDoctorsContainer>
            </S.ContentContainer>
        </S.Container>
    )
}
