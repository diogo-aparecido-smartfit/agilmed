import { useQuery, useQueries } from '@tanstack/react-query'
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

    const doctorIds = Array.from(new Set(appointments.map((a) => a.doctor_id)))
    const doctorPicturesQueries = useQueries({
        queries: doctorIds.map((doctorId) => ({
            queryKey: ['doctorProfilePicture', doctorId],
            queryFn: async () => {
                const { data } = await httpClient.get(`/user/${doctorId}`)
                return {
                    doctorId,
                    profile_picture_url: data.profile_picture_url || null,
                }
            },
            staleTime: 1000 * 60 * 60,
            enabled: !!doctorId,
        })),
    })

    const doctorPicturesMap = doctorPicturesQueries.reduce((acc, query) => {
        if (query.data) {
            acc[query.data.doctorId] = query.data.profile_picture_url
        }
        return acc
    }, {} as Record<string | number, string | null>)

    const appointmentsWithPictures = appointments.map((a) => ({
        ...a,
        doctor_profile_picture_url: doctorPicturesMap[a.doctor_id] || null,
    }))

    return { appointments: appointmentsWithPictures, loading, refetch, error }
}
