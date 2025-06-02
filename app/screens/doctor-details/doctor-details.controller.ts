import { useCallback, useState, useRef, useMemo } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { Linking, Platform } from 'react-native'
import httpClient from '@/services/api/http.client'
import { IDoctor } from '@/types/types'
import BottomSheet from '@gorhom/bottom-sheet'
import { showMessage } from 'react-native-flash-message'

const fetchDoctorDetails = async (id: string): Promise<IDoctor> => {
    const response = await httpClient.get(`/doctors/${id}`)
    return response.data
}

export const useDoctorDetailsController = () => {
    const { id } = useLocalSearchParams()
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['65%', '80%'], [])

    const {
        data: doctor,
        isLoading,
        error,
        refetch,
    } = useQuery<IDoctor>({
        queryKey: ['doctor', id],
        queryFn: () => fetchDoctorDetails(id as string),
        enabled: !!id,
    })

    const handleBackPress = useCallback(() => {
        router.back()
    }, [])

    const handleCallDoctor = useCallback(() => {
        if (doctor?.phone) {
            Linking.openURL(`tel:${doctor.phone.replace(/\D/g, '')}`)
        }
    }, [doctor?.phone])

    const handleSendEmail = useCallback(() => {
        if (doctor?.email) {
            Linking.openURL(`mailto:${doctor.email}`)
        }
    }, [doctor?.email])

    const handleScheduleAppointment = useCallback(() => {
        if (doctor?.id) {
            showMessage({
                message: 'Desculpe, mas essa ação ainda não foi implementada.',
                type: 'info',
            })
            // router.push({
            //     pathname: '/(appointment)/schedule',
            //     params: { doctorId: doctor.id },
            // })
        }
    }, [doctor?.id])

    const handleOpenMaps = useCallback(() => {
        if (doctor?.address && doctor?.city && doctor?.state) {
            const address = `${doctor.address}, ${doctor.city}, ${doctor.state}`
            const encodedAddress = encodeURIComponent(address)

            const scheme = Platform.select({
                ios: 'maps://?q=',
                android: 'geo:0,0?q=',
            })

            Linking.openURL(`${scheme}${encodedAddress}`)
        }
    }, [doctor?.address, doctor?.city, doctor?.state])

    return {
        doctor,
        isLoading,
        error,
        refetch,
        handleBackPress,
        handleCallDoctor,
        handleSendEmail,
        handleScheduleAppointment,
        handleOpenMaps,
        bottomSheetRef,
        snapPoints,
    }
}
