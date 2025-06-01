import React, { useRef, useState, useEffect } from 'react'
import { View, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import Text from '@/components/Text/Text'
import NextAppointment from '../NextAppointment/NextAppointment'
import * as S from './UpcomingAppointmentsSection.style'
import { IAppointment } from '@/types/types'
import { Theme } from '@/config/theme'
import { Calendar } from 'iconsax-react-native'
import { addMinutes } from '@/utils/utils'
import AnimatedPagination from '@/components/AnimatedPagination/animated-pagination'
import { useTheme } from '@/hooks/useTheme'

interface UpcomingAppointmentsSectionProps {
    appointments: IAppointment[]
    loading: boolean
}

export default function UpcomingAppointmentsSection({
    appointments,
    loading,
}: UpcomingAppointmentsSectionProps) {
    const theme = useTheme()
    const scrollViewRef = useRef<ScrollView>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const { width: screenWidth } = Dimensions.get('window')

    const SPACING = 16
    const CARD_WIDTH = screenWidth - 24
    const ITEM_SIZE = CARD_WIDTH + SPACING
    const SIDE_PADDING = (screenWidth - CARD_WIDTH) / 2

    const INITIAL_OFFSET = SIDE_PADDING

    const handleScroll = (event: {
        nativeEvent: { contentOffset: { x: any } }
    }) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x
        const index = Math.round(contentOffsetX / ITEM_SIZE)

        if (
            index !== activeIndex &&
            index >= 0 &&
            index < appointments.length
        ) {
            setActiveIndex(index)
        }
    }

    useEffect(() => {
        if (appointments.length <= 1) return

        const interval = setInterval(() => {
            if (scrollViewRef.current) {
                const nextIndex = (activeIndex + 1) % appointments.length

                const xPosition = nextIndex * ITEM_SIZE

                scrollViewRef.current.scrollTo({
                    x: xPosition,
                    animated: true,
                })
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [activeIndex, appointments.length, ITEM_SIZE, INITIAL_OFFSET])

    if (loading) {
        return (
            <S.Container>
                <S.SectionHeader>
                    <S.TitleContainer>
                        <Calendar
                            size={18}
                            color={Theme.colors.mainColor}
                            variant="Bold"
                        />
                        <Text fontWeight="600" fontSize="lg">
                            Agendamentos Futuros
                        </Text>
                    </S.TitleContainer>
                </S.SectionHeader>
                <S.LoadingContainer>
                    <ActivityIndicator
                        size="large"
                        color={Theme.colors.mainColor}
                    />
                    <Text color="description" style={{ marginTop: 8 }}>
                        Carregando seus agendamentos...
                    </Text>
                </S.LoadingContainer>
            </S.Container>
        )
    }

    return (
        <S.Container>
            <S.SectionHeader>
                <S.TitleContainer>
                    <Calendar
                        size={18}
                        color={Theme.colors.mainColor}
                        variant="Bold"
                    />
                    <Text fontWeight="600" fontSize="lg">
                        Agendamentos Futuros
                    </Text>
                </S.TitleContainer>
                {appointments.length > 0 && (
                    <S.CountBadge>
                        <Text fontSize="xs" color="white" fontWeight="500">
                            {appointments.length}
                        </Text>
                    </S.CountBadge>
                )}
            </S.SectionHeader>

            {appointments.length === 0 ? (
                <S.EmptyContainer>
                    <S.EmptyIllustration>
                        <Calendar
                            size={40}
                            color={Theme.colors.lightDescription}
                            variant="Bulk"
                        />
                    </S.EmptyIllustration>
                    <Text color="description" textAlign="center">
                        Você ainda não possui agendamentos futuros.
                    </Text>
                </S.EmptyContainer>
            ) : (
                <S.Wrapper>
                    <S.AppointmentsWrapper
                        ref={scrollViewRef}
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        pagingEnabled
                        decelerationRate="fast"
                        snapToInterval={ITEM_SIZE}
                        snapToAlignment="center"
                        onMomentumScrollEnd={handleScroll}
                        contentContainerStyle={{
                            paddingHorizontal: SIDE_PADDING,
                            paddingBottom: 16,
                        }}
                    >
                        {appointments.map((appointment, index) => (
                            <S.AppointmentContainer
                                key={appointment.id}
                                style={{
                                    width: CARD_WIDTH,
                                    marginRight: SPACING,
                                    marginLeft: index === 0 ? 0 : 0,
                                }}
                            >
                                <NextAppointment
                                    id={appointment.id}
                                    doctorImagePicture={
                                        appointment.doctor.user
                                            .profile_picture_url || ''
                                    }
                                    date={format(
                                        new Date(appointment.appointment_date),
                                        "EEEE, dd 'de' MMMM",
                                        { locale: ptBR }
                                    )}
                                    doctorName={appointment.doctor_name}
                                    doctorType={appointment.doctor.specialty}
                                    startAt={format(
                                        new Date(appointment.appointment_date),
                                        'HH:mm'
                                    )}
                                    endAt={format(
                                        addMinutes(
                                            new Date(
                                                appointment.appointment_date
                                            ),
                                            30
                                        ),
                                        'HH:mm'
                                    )}
                                />
                            </S.AppointmentContainer>
                        ))}
                    </S.AppointmentsWrapper>

                    {appointments.length > 1 && (
                        <AnimatedPagination
                            totalItems={appointments.length}
                            activeIndex={activeIndex}
                            dotActiveColor={Theme.colors.mainColor}
                            dotInactiveColor={Theme.colors.lightDescription}
                        />
                    )}
                </S.Wrapper>
            )}
        </S.Container>
    )
}
