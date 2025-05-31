import httpClient from '@/services/api/http.client'
import { IDoctor } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

const fetchDoctors = async (): Promise<IDoctor[]> => {
    const { data } = await httpClient.get('/doctors')
    return data
}

export function useDoctors() {
    const {
        data: doctors = [],
        isLoading,
        error,
        refetch,
    } = useQuery<IDoctor[]>({
        queryKey: ['doctors'],
        queryFn: fetchDoctors,
    })

    return {
        doctors,
        isLoading,
        error,
        refetch,
    }
}
