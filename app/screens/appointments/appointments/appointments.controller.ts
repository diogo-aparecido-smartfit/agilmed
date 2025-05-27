import { useMemo, useState } from 'react'
import { useAppointments } from '@/hooks/api/useAppointments'
import { IAppointment } from '@/types/types'

export function useAppointmentsController() {
    const { appointments, loading, error, refetch } = useAppointments()
    const [statusFilter, setStatusFilter] = useState<string | null>(null)

    const filteredAppointments = useMemo(() => {
        if (!statusFilter) return appointments
        return appointments.filter(
            (a: IAppointment) => a.status === statusFilter
        )
    }, [appointments, statusFilter])

    return {
        appointments: filteredAppointments,
        loading,
        error,
        refetch,
        statusFilter,
        setStatusFilter,
    }
}
