import MapView from 'react-native-maps'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Linking, Platform } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import httpClient from '@/services/api/http.client'
import { IAppointment } from '@/types/types'
import { router } from 'expo-router'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

const fetchAppointmentDetails = async (id: string): Promise<IAppointment> => {
    const response = await httpClient.get(`/appointments/${id}`)
    return response.data
}

export const UseAppointmentDetailsController = () => {
    const { id } = useLocalSearchParams()
    const bottomSheetRef = useRef<BottomSheet>(null)
    const mapRef = useRef<MapView>(null)
    const snapPoints = useMemo(() => ['65%', '80%'], [])
    const [region, setRegion] = useState({
        latitude: -18.91229011548046,
        longitude: -48.274014322977926,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    })

    const { data: appointment, isLoading } = useQuery<IAppointment>({
        queryKey: ['appointment', id],
        queryFn: () => fetchAppointmentDetails(id as string),
        enabled: !!id,
    })

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current?.animateCamera({
                center: region,
                pitch: 45,
                heading: 0,
                altitude: 1000,
                zoom: 15,
            })
        }
    }, [region])

    const scheme = Platform.select({
        ios: 'maps://0,0?q=',
        android: 'geo:0,0?q=',
    })

    const label = appointment?.doctor?.address || 'Localização da Clínica'
    const latLng = `${region.latitude},${region.longitude}`
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
    })

    const handleOpenOnMaps = useCallback(() => {
        Linking.openURL(url as string)
    }, [url])

    const handleBackPress = useCallback(() => {
        router.back()
    }, [])

    const formatAppointmentDate = useCallback((date: string) => {
        return format(new Date(date), "EEEE, dd 'de' MMMM 'de' yyyy", {
            locale: ptBR,
        })
    }, [])

    const formatAppointmentTime = useCallback((date: string) => {
        return format(new Date(date), 'HH:mm')
    }, [])

    const getStatusColor = useCallback((status: string) => {
        switch (status) {
            case 'confirmed':
                return '#4CAF50'
            case 'cancelled':
                return '#F44336'
            case 'completed':
                return '#2196F3'
            default:
                return '#FFC107'
        }
    }, [])

    const getStatusLabel = useCallback((status: string) => {
        switch (status) {
            case 'confirmed':
                return 'Confirmada'
            case 'cancelled':
                return 'Cancelada'
            case 'completed':
                return 'Concluída'
            default:
                return 'Pendente'
        }
    }, [])

    return {
        appointment,
        isLoading,
        handleOpenOnMaps,
        handleBackPress,
        formatAppointmentDate,
        formatAppointmentTime,
        getStatusColor,
        getStatusLabel,
        mapRef,
        region,
        bottomSheetRef,
        snapPoints,
    }
}
