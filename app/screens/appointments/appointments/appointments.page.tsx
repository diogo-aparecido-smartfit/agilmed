/** @jsxImportSource @emotion/react */
import * as S from '@/screens/appointments/appointments/appointments.style'
import NextAppointments from './Components/NextAppointments/NextAppointments'
import Header from './Components/Header/Header'
import { View, ScrollView } from 'react-native'

export default function AppointmentsPage() {
    return (
        <View css={S.containerStyle}>
            <ScrollView contentContainerStyle={S.contentContainerStyle}>
                <Header />
                <View css={S.appointmentListStyle}>
                    <NextAppointments />
                    <NextAppointments />
                    <NextAppointments />
                    <NextAppointments />
                    <NextAppointments />
                    <NextAppointments />
                    <NextAppointments />
                </View>
            </ScrollView>
        </View>
    )
}
