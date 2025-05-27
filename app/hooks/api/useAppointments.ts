import { useQuery } from '@tanstack/react-query'
import httpClient from '@/services/api/http.client'
import { IAppointment } from '@/types/types'

async function fetchAppointments(): Promise<IAppointment[]> {
    const response = await httpClient.get('/appointments/my')
    return response.data
}

export function useAppointments() {
    const {
        data: appointments = [],
        isLoading: loading,
        refetch,
        error,
    } = useQuery<IAppointment[]>({
        queryKey: ['appointments'],
        queryFn: fetchAppointments,
    })

    return { appointments, loading, refetch, error }
}
