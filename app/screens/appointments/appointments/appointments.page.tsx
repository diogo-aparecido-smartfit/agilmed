import * as S from '@/screens/appointments/appointments/appointments.style'
import NextAppointments from './Components/NextAppointments/NextAppointments'
import Header from './Components/Header/Header'
import { useAppointmentsController } from './appointments.controller'
import { ActivityIndicator, FlatList } from 'react-native'
import Text from '@/components/Text/Text'
import { Calendar, ClipboardTick, EmptyWalletTime } from 'iconsax-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IAppointment } from '@/types/types'
import { useTheme } from '@emotion/react'

function AppointmentsLoading() {
    const theme = useTheme()

    return (
        <S.LoadingContainer>
            <ActivityIndicator size="large" color={theme.colors.mainColor} />
            <Text color="description" style={{ marginTop: 16 }}>
                Carregando consultas...
            </Text>
        </S.LoadingContainer>
    )
}

function AppointmentsError() {
    const theme = useTheme()

    return (
        <S.EmptyContainer>
            <EmptyWalletTime size={64} color={theme.colors.error} />
            <Text
                color="error"
                fontSize="lg"
                fontWeight="500"
                style={{ marginTop: 16 }}
            >
                Não foi possível carregar as consultas
            </Text>
            <Text
                color="description"
                style={{ marginTop: 8, textAlign: 'center' }}
            >
                Ocorreu um erro ao buscar seus agendamentos. Por favor, tente
                novamente.
            </Text>
        </S.EmptyContainer>
    )
}

function AppointmentsEmpty() {
    const theme = useTheme()

    return (
        <S.EmptyContainer>
            <Calendar
                size={64}
                color={theme.colors.lightDescription}
                variant="Bulk"
            />
            <Text
                fontSize="lg"
                color="description"
                fontWeight="500"
                style={{ marginTop: 16 }}
            >
                Sem consultas agendadas
            </Text>
            <Text
                color="inputColor"
                style={{ marginTop: 8, textAlign: 'center' }}
            >
                Você ainda não possui nenhuma consulta agendada. Que tal marcar
                uma agora?
            </Text>
        </S.EmptyContainer>
    )
}

export default function AppointmentsPage() {
    const theme = useTheme()
    const { appointments, loading, error, statusFilter, setStatusFilter } =
        useAppointmentsController()

    const renderAppointment = ({ item }: { item: IAppointment }) => (
        <NextAppointments key={item.id} appointment={item} />
    )

    const ListHeaderComponent = () => (
        <S.ListHeader>
            <ClipboardTick
                size={22}
                color={theme.colors.mainColor}
                variant="Bold"
            />
            <Text fontSize="lg" fontWeight="600">
                Minhas Consultas
            </Text>
        </S.ListHeader>
    )

    return (
        <S.Container>
            <Header
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {loading ? (
                <AppointmentsLoading />
            ) : error ? (
                <AppointmentsError />
            ) : appointments.length === 0 ? (
                <AppointmentsEmpty />
            ) : (
                <FlatList
                    data={appointments}
                    renderItem={renderAppointment}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={ListHeaderComponent}
                />
            )}
        </S.Container>
    )
}
