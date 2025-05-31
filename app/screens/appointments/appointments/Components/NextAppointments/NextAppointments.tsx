import Text from '@/components/Text/Text'
import * as S from './style'
import Avatar from '@/components/Avatar/Avatar'
import { Calendar2, Clock, StatusUp } from 'iconsax-react-native'
import { Theme } from '@/config/theme'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { IAppointment } from '@/types/types'

const statusColors = {
    pending: Theme.colors.warning,
    confirmed: Theme.colors.success,
    cancelled: Theme.colors.error,
    completed: Theme.colors.mainColor,
}

const statusLabels = {
    pending: 'Pendente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
    completed: 'Concluída',
}

interface NextAppointmentsProps {
    appointment: IAppointment
}

const NextAppointments = ({ appointment }: NextAppointmentsProps) => {
    const handleNavigate = () => {
        router.push(`/(appointment)/details/${appointment.id}`)
    }

    return (
        <S.Container onPress={handleNavigate}>
            <S.HeaderContainer>
                <Avatar
                    size={48}
                    uri={
                        appointment.doctor.user.profile_picture_url || undefined
                    }
                />
                <S.DoctorInfoWrapper>
                    <Text color="black" fontWeight="700">
                        {appointment.doctor_name}
                    </Text>
                    <Text color="description" fontSize="sm" fontWeight="400">
                        {appointment.doctor?.specialty || 'Médico'}
                    </Text>
                </S.DoctorInfoWrapper>
                <S.StatusBadge status={appointment.status}>
                    <Text fontSize="xs" color="white">
                        {statusLabels[
                            appointment.status as keyof typeof statusLabels
                        ] || 'Pendente'}
                    </Text>
                </S.StatusBadge>
            </S.HeaderContainer>
            <S.Divider />
            <S.SchedulesWrapper>
                <S.ScheduleContainer>
                    <Calendar2 color={Theme.colors.description} size={16} />
                    <Text color="description" fontSize="xs" fontWeight="400">
                        {format(
                            new Date(appointment.appointment_date),
                            "EEEE, dd 'de' MMMM",
                            { locale: ptBR }
                        )}
                    </Text>
                </S.ScheduleContainer>
                <S.ScheduleContainer>
                    <Clock color={Theme.colors.description} size={16} />
                    <Text color="description" fontSize="xs" fontWeight="400">
                        {format(
                            new Date(appointment.appointment_date),
                            'HH:mm'
                        )}
                    </Text>
                </S.ScheduleContainer>
            </S.SchedulesWrapper>
            <S.ReasonContainer>
                <Text fontSize="sm" fontWeight="500">
                    Motivo:
                </Text>
                <Text fontSize="sm" color="description">
                    {appointment.reason}
                </Text>
            </S.ReasonContainer>
        </S.Container>
    )
}

export default NextAppointments
