import { View } from 'react-native'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import Text from '@/components/Text/Text'
import NextAppointment from '../NextAppointment/NextAppointment'
import * as S from './UpcomingAppointmentsSection.style'

interface UpcomingAppointmentsSectionProps {
    appointments: any[]
    loading: boolean
}

export default function UpcomingAppointmentsSection({
    appointments,
    loading,
}: UpcomingAppointmentsSectionProps) {
    return (
        <S.Container>
            <Text fontWeight="600">Agendamentos futuros 🚀</Text>
            <S.AppointmentsWrapper
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
                            doctorImagePicture={
                                appointment.doctor_profile_picture_url || ''
                            }
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
            </S.AppointmentsWrapper>
        </S.Container>
    )
}
