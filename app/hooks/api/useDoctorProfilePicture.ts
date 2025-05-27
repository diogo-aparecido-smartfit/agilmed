import { useQuery } from '@tanstack/react-query'
import httpClient from '@/services/api/http.client'

export function useDoctorProfilePicture(doctorId: number | string) {
    return useQuery({
        queryKey: ['doctorProfilePicture', doctorId],
        queryFn: async () => {
            const { data } = await httpClient.get(`/user/${doctorId}`)
            return data.profile_picture_url || null
        },
        staleTime: 1000 * 60 * 60,
        enabled: !!doctorId,
    })
}
