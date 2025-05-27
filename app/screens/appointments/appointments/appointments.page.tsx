import * as S from '@/screens/appointments/appointments/appointments.style'
import NextAppointments from './Components/NextAppointments/NextAppointments'
import Header from './Components/Header/Header'
import { useAppointmentsController } from './appointments.controller'
import { ActivityIndicator } from 'react-native'
import { Theme } from '@/config/theme'
import Text from '@/components/Text/Text'

function AppointmentsLoading() {
    return <ActivityIndicator color={Theme.colors.mainColor} />
}

function AppointmentsError() {
    return <Text color="error">Erro ao carregar agendamentos.</Text>
}

function AppointmentsEmpty() {
    return (
        <S.CenteredContainer>
            <Text fontSize="lg" color="description">
                Sem resultados
            </Text>
        </S.CenteredContainer>
    )
}

function AppointmentsList({ appointments }: { appointments: any[] }) {
    return (
        <>
            {appointments.map((appointment) => (
                <NextAppointments key={appointment.id} {...appointment} />
            ))}
        </>
    )
}

export default function AppointmentsPage() {
    const { appointments, loading, error, statusFilter, setStatusFilter } =
        useAppointmentsController()

    return (
        <S.Container>
            <S.ContentContainer
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Header
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />
                <S.AppointmentList>
                    {loading ? (
                        <AppointmentsLoading />
                    ) : error ? (
                        <AppointmentsError />
                    ) : appointments.length === 0 ? (
                        <AppointmentsEmpty />
                    ) : (
                        <AppointmentsList appointments={appointments} />
                    )}
                </S.AppointmentList>
            </S.ContentContainer>
        </S.Container>
    )
}
